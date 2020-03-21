import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import styled from "styled-components";

const Wrapper = styled.figure`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;
  padding: 4px;
  max-width: 512px;
  border-radius: 4px;
  background-color: black;
  box-sizing: border-box;
  transition: opacity 150ms ease-in-out;
  outline-color: blue;
  outline-style: dotted;
  outline-width: 0;
  outline-offset: 2px;

  &:focus {
    outline-width: 4px;

    @media (min-width: 1024px) {
      outline-width: 6px;
    }
  }

  @media (min-width: 1024px) {
    padding: 6px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
  border-radius: 2px;
  overflow: hidden;
`;

const Image = styled.img`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const Caption = styled.figcaption`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  margin: 0;
  padding: 4px 0 0 0;
  user-select: none;

  @media (min-width: 1024px) {
    padding: 8px 0 0 0;
  }
`;

const Name = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  font-size: 12px;
  color: white;

  /* Truncate String with Ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const Play = styled.button`
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  appearance: none;
  outline: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

const PlayIcon = styled.span`
  display: block;
  font-size: 40px;
  transition: transform 200ms ease-in-out;

  ${Play}:hover & {
    transform: scale(1.2);
  }
`;

const SoundItem = ({ id, name, audio, image, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // FIXME: Playback is only working if device is NOT muted (iOS)
  const [sound] = useState(
    new Howl({
      src: audio.src,
      preload: true
    })
  );

  useEffect(() => {
    const handlePlay = () => setIsPlaying(sound.playing());
    const handleEnd = () => setIsPlaying(sound.playing());

    sound.on("play", handlePlay);
    sound.on("end", handleEnd);

    return () => {
      sound.off("play", handlePlay);
      sound.off("end", handleEnd);
    };
  }, [sound]);

  const handleKeyPress = event => {
    event.preventDefault();
    // Keys: [Space|Return]
    if (event.which === 13 || event.which === 32) {
      handleOnPlay();
    }
    return;
  };

  const handleOnPlay = event => {
    event.preventDefault();
    if (onPlay) {
      onPlay({ id });
    }
    sound.play();
  };

  return (
    <Wrapper
      role="button"
      tabIndex="0"
      onClick={handleOnPlay}
      onKeyPress={handleKeyPress}
    >
      <ImageWrapper>
        <Image src={image.src} alt={image.alt || image.name} />
      </ImageWrapper>
      <Caption>
        <Name>{name}</Name>
        <Play type="button" onClick={handleOnPlay}>
          <PlayIcon role="img" aria-label="hidden">
            {isPlaying ? "🔊" : "🔈"}
            {/* TODO: icon for muted/error state: 🔇 */}
          </PlayIcon>
        </Play>
      </Caption>
    </Wrapper>
  );
};

export default SoundItem;
