import React, { useState, useEffect } from "react";
import useSocket from "./hooks/useSocket";

async function playAudio(path) {
  try {
    const audio = new Audio();
    audio.src = path;
    await audio.play();
  } catch (error) {
    console.error("[AUTOPLAY-ERROR]", error);
  }
}

const createBase64String = (type, chunks) => {
  const string = `data:${type};base64,${window.btoa(chunks)}`;
  return string;
};

function App() {
  const socket = useSocket();
  const [userAmount, setUserAmount] = useState(null);

  useEffect(() => {
    const handleConnectEvent = () => {
      console.log("connected", socket.id);
    };

    const handleUserEvent = ({ amount }) => {
      console.log("user event");
      setUserAmount(amount);
    };

    const handleSoundEvent = ({ chunk }) => {
      console.log("sound event");
      const audioChunks = [];
      audioChunks.push(chunk);
      const audioSrc = createBase64String("audio/mpeg", audioChunks);
      playAudio(audioSrc);
    };

    handleConnectEvent();

    socket.on("connect", handleConnectEvent);
    socket.on("user", handleUserEvent);
    socket.on("sound", handleSoundEvent);

    return () => {
      socket.off("connect");
      socket.off("user");
      socket.off("sound");
    };
  }, [socket]);

  function handleOnClickStream(id) {
    console.log("handleOnClickStream", id);
    socket.emit("sound", { soundId: id });
  }

  return (
    <div className="App">
      <h1>Hello Client!</h1>
      <p>{userAmount} User connected</p>

      <button type="button" onClick={() => handleOnClickStream("boing")}>
        Stream Boing
      </button>

      <button type="button" onClick={() => handleOnClickStream("fuck")}>
        Stream Fuck
      </button>
    </div>
  );
}

export default App;
