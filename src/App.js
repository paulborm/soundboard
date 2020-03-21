import React, { useState, useEffect } from "react";
import { useSounds, useSockets } from "./hooks";
import SoundItem from "./components/SoundItem";
import { playAudio } from "./helpers";

function App() {
  const socket = useSockets();
  const { status: soundsStatus, data: sounds } = useSounds();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleUserEvent = ({ amount }) => {
      console.log("[EVENT: user]");
      setUser(amount);
    };

    const handleSoundEvent = ({ name, audio }) => {
      console.log(`[EVENT: sound] Playing ${name}`);
      playAudio(audio.src);
    };

    socket.on("user", handleUserEvent);
    socket.on("sound", handleSoundEvent);

    return () => {
      socket.off("user", handleUserEvent);
      socket.on("sound", handleSoundEvent);
    };
  }, [socket]);

  const handleOnPlay = event => {
    const sound = sounds.find(({ id }) => id === event.id);
    socket.emit("sound", { sound });
  };

  return (
    <div className="App">
      <p>Connected User: {user}</p>
      {soundsStatus === "success" &&
        sounds.map(({ id, name, audio, image }) => (
          <SoundItem
            key={id}
            id={id}
            name={name}
            audio={audio}
            image={image}
            onPlay={handleOnPlay}
          />
        ))}
      {soundsStatus === "loading" && <p>Loading Sounds...</p>}
      {soundsStatus === "error" && (
        <p>
          Error: Something went wrong while loading the sounds. Please try
          again.
        </p>
      )}
    </div>
  );
}

export default App;
