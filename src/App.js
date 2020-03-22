import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSounds, useSocket } from "./hooks";
import SoundItem from "./components/SoundItem";
import { playAudio } from "./helpers";

const SoundItems = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(196px, 1fr));
`;

function App() {
  const socket = useSocket();
  const { status: soundsStatus, data: sounds } = useSounds();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log(`[EVENT: connect] ${socket.id}`);
    };

    const handleUserEvent = ({ amount }) => {
      console.log("[EVENT: user]");
      setUser(amount);
    };

    const handleSoundEvent = ({ name, audio }) => {
      console.log(`[EVENT: sound] Playing ${name}`);
      playAudio(audio.src);
    };

    socket.on("connect", handleConnect);
    socket.on("user", handleUserEvent);
    socket.on("sound", handleSoundEvent);

    return () => {
      socket.off("connect", handleConnect);
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

      {soundsStatus === "success" && (
        <SoundItems>
          {sounds.map(({ id, name, audio, image }) => (
            <SoundItem
              key={id}
              id={id}
              name={name}
              audio={audio}
              image={image}
              onPlay={handleOnPlay}
            />
          ))}
        </SoundItems>
      )}
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
