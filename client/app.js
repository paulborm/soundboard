"use strict";

/**
 * @typedef {Object} Sound
 * @property {string} id
 * @property {string} name
 * @property {string} audio
 * @property {string} thumbnail
 */

/**
 * @typedef {Object} State
 * @property {Array<SoundBoardSound>} sounds
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 */

class SoundBoardStore extends EventTarget {
	/** @type {State} */
	state;

	/** @return {State} */
	get initialState() {
		return {
			sounds: [],
		};
	}

	constructor() {
		super();

		const eventTarget = this;

		this.state = new Proxy(this.initialState, {
			set(target, prop, value, receiver) {
				Reflect.set(...arguments);
				eventTarget.#emit("change", {
					detail: { target, prop, value, receiver },
					bubbles: true,
					cancelable: true,
				});
				return true;
			},
		});

		this.#init();
	}

	#init() {
		this.fetchSounds();
	}

	/** @return {Array<SoundBoardSound>} */
	async fetchSounds() {
		/** @type {Array} */
		const sounds = await (
			await fetch(`${self.sb.STATIC_ASSETS_URL}/sounds/sounds.json`)
		).json();

		this.state.sounds = sounds;
	}

	/**
	 * @param {"change"} type
	 * @param {EventListenerOrEventListenerObject} callback
	 * @param {boolean | AddEventListenerOptions} options
	 */
	addEventListener(type, callback, options) {
		super.addEventListener(...arguments);
	}

	/**
	 * @param {"change"} type
	 * @param {CustomEventInit} data
	 */
	#emit(type, data) {
		this.dispatchEvent(new CustomEvent(type, data));
	}
}

const store = new SoundBoardStore();

class SoundBoard extends HTMLElement {
	get sounds() {
		return [...this.childNodes].find(
			(child) => child instanceof SoundBoardSounds
		);
	}

	get socket() {
		return [...this.childNodes].find(
			(child) => child instanceof SoundBoardSocket
		);
	}

	constructor() {
		super();
	}

	connectedCallback() {
		store.addEventListener("change", this.#onStateChange.bind(this));
		this.addEventListener("playing", this.#handler.bind(this));
		this.addEventListener("socket:sound", this.#handler.bind(this));
	}

	disconnectedCallback() {
		this.removeEventListener("playing", this.#handler.bind(this));
		this.removeEventListener("socket:sound", this.#handler.bind(this));
	}

	#handler(event) {
		event.stopPropagation();

		if (event.type === "playing") {
			this.socket.emit("sound", { sound: event.detail });
		}

		if (event.type === "socket:sound") {
			this.sounds.play(event.detail.sound.id);
		}
	}

	#onStateChange(event) {
		const { detail } = event;
		if (detail.prop === "sounds") {
			this.sounds.add(detail.value);
		}
	}
}

class SoundBoardSocket extends HTMLElement {
	/** @type {WebSocket} */
	socket;
	/** @type {User} */
	session;

	constructor() {
		super();
		this.socket = new WebSocket(self.sb.SOCKET_URL);
	}

	connectedCallback() {
		this.socket.addEventListener("message", this.#onMessage.bind(this));
	}

	disconnectedCallback() {
		this.socket.removeEventListener("message", this.#onMessage.bind(this));
		this.socket.close();
	}

	/**
	 * @param {MessageEvent} event
	 */
	#onMessage(event) {
		log("socket:onmessage", { event });

		const data = JSON.parse(event.data);

		if (data.type === "userlogin") {
			this.session = data.user;

			log("SoundBoardSocket:message:userlogin", {
				user: data.user,
				session: this.session,
			});
		}

		if (data.type === "sound") {
			log("socket:onmessage:sound", { data });

			const id = data.user.id;

			if (!!id && !!this.session.id && id !== this.session.id) {
				this.dispatchEvent(
					new CustomEvent("socket:sound", {
						detail: {
							sound: data.sound,
							user: data.user,
						},
						bubbles: true,
						composed: true,
					})
				);
			}
		}
	}

	/**
	 * @param {string} type
	 * @param {Record<string, any>} data
	 */
	emit(type, data) {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(
				JSON.stringify({
					type,
					...data,
				})
			);
		} else {
			throw new Error(
				"Unable to emit event. Invalid WebSocket readyState",
				this.socket
			);
		}
	}
}

class SoundBoardSounds extends HTMLElement {
	/** @type {Array<SoundBoardSound>} */
	sounds = [];

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		/** @type {HTMLTemplateElement} */
		const template = document.getElementById("sound-board-template");
		shadow.innerHTML = "";
		shadow.appendChild(template.content.cloneNode(true));
	}

	/**
	 * @param {Sound[]} sounds
	 */
	add(sounds) {
		this.sounds = sounds.map(
			(sound) =>
				new SoundBoardSound({
					id: sound.id,
					name: sound.name,
					audio: createAssetUrl(sound.audio.fileName, "sounds"),
					thumbnail: createAssetUrl(sound.image.fileName, "images"),
				})
		);

		this.shadowRoot.append(...this.sounds);
	}

	/**
	 * @param {Sound["id"]} id
	 */
	play(id) {
		this.sounds.forEach((sound) => {
			if (sound instanceof SoundBoardSound && sound.id === id) {
				sound.play();
			}
		});
	}
}

class SoundBoardSound extends HTMLElement {
	set id(value) {
		this.setAttribute("id", value);
	}

	get id() {
		return this.getAttribute("id");
	}

	set name(value) {
		this.setAttribute("name", value);
	}

	get name() {
		return this.getAttribute("name");
	}

	set audio(value) {
		this.setAttribute("audio", value);
	}

	get audio() {
		return this.getAttribute("audio");
	}

	set thumbnail(value) {
		this.setAttribute("thumbnail", value);
	}

	get thumbnail() {
		return this.getAttribute("thumbnail");
	}

	get playing() {
		return this.dataset.playing;
	}

	set playing(value) {
		const isPlaying = Boolean(value);
		if (isPlaying) {
			this.setAttribute("playing", "");
		} else {
			this.removeAttribute("playing");
		}
	}

	get playing() {
		return this.hasAttribute("playing");
	}

	static get template() {
		return document.getElementById("sound-board-sound-template").content;
	}

	/**
	 * @param {Sound} props
	 */
	constructor({ id, name, audio, thumbnail } = {}) {
		super();

		this.id = id;
		this.name = name;
		this.audio = audio;
		this.thumbnail = thumbnail;

		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = "";
		shadow.appendChild(this.constructor.template.cloneNode(true));
	}

	connectedCallback() {
		const button = this.shadowRoot.querySelector("button");
		const thumbnail = this.shadowRoot.querySelector("img");
		const caption = this.shadowRoot.querySelector("figcaption");

		thumbnail.setAttribute("src", this.thumbnail);
		caption.textContent = this.name;

		button.addEventListener("click", this.#onButtonClick.bind(this));
	}

	disconnectedCallback() {
		const button = this.shadowRoot.querySelector("button");
		button.removeEventListener("click", this.#onButtonClick.bind(this));
	}

	/**
	 * @param {MouseEvent} event
	 */
	#onButtonClick(event) {
		this.play({ broadcast: true });
	}

	get sound() {
		return {
			id: this.id,
			name: this.name,
			audio: this.audio,
			thumbnail: this.thumbnail,
		};
	}

	// TODO: Add debounce/throttle
	play({ broadcast = false } = {}) {
		try {
			this.playing = true;

			log("SoundBoardSound:play", {
				sound: this.sound,
			});

			// NOTE: Important guard to prevent infinite loops
			if (broadcast === true) {
				log("SoundBoardSound:play:broadcast");

				this.dispatchEvent(
					new CustomEvent("playing", {
						detail: this.sound,
						bubbles: true,
						composed: true,
					})
				);
			}

			const audio = new Audio(this.audio);
			audio.currentTime = 0;
			audio.play();
			audio.onended = () => {
				this.playing = false;
			};
		} catch {
			throw new Error("Unable to play sound", this.audio);
		}
	}
}

customElements.define("sound-board", SoundBoard);
customElements.define("sound-board-socket", SoundBoardSocket);
customElements.define("sound-board-sounds", SoundBoardSounds);
customElements.define("sound-board-sound", SoundBoardSound);

/* Utils */

function createAssetUrl(fileName, dir) {
	return new URL(fileName, `${window.sb.STATIC_ASSETS_URL}/${dir}/`).toString();
}

function log(...args) {
	if (window.sb.debug === true) {
		console.log(...args);
	}
}
