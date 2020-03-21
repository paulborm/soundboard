import React from "react";
import { playAudio } from "../../helpers";

const SoundItem = ({ id, name, audio, image, onPlay }) => {
  const handleOnPlay = event => {
    event.preventDefault();
    if (!onPlay) {
      return;
    }
    playAudio(audio.src);
    onPlay({ id });
  };

  return (
    <figure>
      <img src={image.src} alt={image.alt || image.name} />
      <figcaption>
        {name}
        <button type="button" onClick={handleOnPlay}>
          Play
        </button>
      </figcaption>
    </figure>
  );
};

export default SoundItem;
