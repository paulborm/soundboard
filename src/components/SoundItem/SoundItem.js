import React, { useRef } from "react";

const SoundItem = ({ name, audio, image, onClickPlay, onPlay, ...other }) => {
  const audioRef = useRef(null);

  const handleOnClickPlay = event => {
    event.preventDefault();
    if (!onClickPlay) {
      return;
    }
    audioRef.current.play();
    onClickPlay({ ref: audioRef.current, event });
  };

  const handleOnPlay = event => {
    if (!onPlay) {
      return;
    }
    onClickPlay({ id: audio.id, ref: audioRef.current, event });
  };

  return (
    <figure>
      <img src={image.src} alt={image.alt} />
      <audio
        ref={audioRef}
        controls={false}
        src={audio.src}
        onPlay={handleOnPlay}
        {...other}
      />
      <figcaption>
        {name}
        <button type="button" onClick={handleOnClickPlay}>
          Play
        </button>
      </figcaption>
    </figure>
  );
};

export default SoundItem;
