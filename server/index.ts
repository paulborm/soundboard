import { Server } from "https://deno.land/std@0.154.0/http/server.ts";
import { config as loadEnv } from "https://deno.land/std@0.154.0/dotenv/mod.ts";

await loadEnv({
  export: true,
  allowEmptyValues: true,
});

class User {
  readonly id: string;
  name: string = "anonymous";

  constructor(name?: string) {
    this.id = crypto.randomUUID();

    if (!!name?.trim()) {
      this.name = name.trim();
    }
  }
}

class Store {
  readonly #users: Map<WebSocket, User> = new Map();

  get users() {
    return this.#users;
  }

  getUser(key: WebSocket | User["id"]) {
    if (key instanceof WebSocket) {
      return this.#users.get(key);
    } else {
      let user;
      this.#users.forEach((item, _) => {
        if (key === item.id) {
          user = item;
        }
      });
      return user;
    }
  }

  addUser(socket: WebSocket, user: User) {
    this.#users.set(socket, user);
    return this.getUser(socket);
  }

  deleteUser(key: WebSocket | User) {
    if (key instanceof WebSocket) {
      this.#users.delete(key);
    }

    if (key instanceof User) {
      this.#users.forEach(({ id }, ws) => {
        if (key.id === id) {
          this.#users.delete(ws);
        }
      });
    }
  }
}

const store = new Store();

const channel = new BroadcastChannel("ws");
channel.addEventListener("message", channelHandler);

const server = new Server({ handler });
const port = Number(Deno.env.get("PORT")) || 3001;

console.log(`Server listening on port ${port}`);

await server.serve(Deno.listen({ port }));

function channelHandler(event: MessageEvent) {
  console.log("channel:event", event);

  if (event.target !== channel) {
    channel.postMessage(
      JSON.stringify(event.data),
    );
  }

  const data = JSON.parse(event.data);

  if (event.type === "close") {
    store.users.forEach((user, ws) => {
      if (!data.user || user.id === data.user.id) {
        return;
      }
      ws.send(
        JSON.stringify({
          type: "userleft",
          user: data.user,
        }),
      );
    });
  }

  if (event.type === "message") {
    if (data.type === "adduser") {
      store.users.forEach((_, ws) => {
        ws.send(
          JSON.stringify({
            type: "userjoined",
            user: data.user,
            users: Array.from(store.users.values()),
          }),
        );
      });
    }

    if (data.type === "sound") {
      store.users.forEach((_, ws) => {
        ws.send(
          JSON.stringify({
            type: "sound",
            sound: data.sound,
            user: data.user,
          }),
        );
      });
    }

    if (data.type === "updateuser") {
      const { username, user } = data;

      if (
        !username ||
        username.length <= 0 ||
        username.length > 46 ||
        typeof username !== "string"
      ) {
        return;
      }

      const updatedUser = { ...user, name: username };

      store.users.forEach((_, ws) => {
        ws.send(
          JSON.stringify({
            type: "userupdated",
            user: updatedUser,
          }),
        );
      });
    }
  }
}

async function handler(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname === "/ws") {
    if (request.headers.get("Origin") !== Deno.env.get("CLIENT_URL")) {
      return new Response(null, { status: 400 });
    }

    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.addEventListener("open", (event) => {
      console.log("open", event);
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "adduser") {
        const user = store.addUser(
          socket,
          new User(data.name),
        );

        console.log("adduser", user);

        socket.send(
          JSON.stringify({
            type: "userlogin",
            user,
            users: Array.from(store.users.values()),
          }),
        );

        data.user = user;
      }

      if (data.type === "updateuser") {
        const user = store.getUser(socket);
        data.user = user;
      }

      if (data.type === "sound") {
        const user = store.getUser(socket);
        data.user = user;
      }

      channelHandler(
        new MessageEvent("message", { data: JSON.stringify(data) }),
      );
    });

    socket.addEventListener("close", (event) => {
      const user = store.getUser(socket) as User;

      if (user) {
        store.deleteUser(user);
      }

      console.log("event:close", { user });

      channelHandler(
        new MessageEvent("close", { data: JSON.stringify({ user }) }),
      );
    });

    socket.addEventListener("error", () => {});

    return response;
  }

  return new Response("Nothing found 🥲", { status: 404 });
}
