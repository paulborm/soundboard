import React, { useEffect, useState } from "react";
import { Howl } from "howler";
import styled from "styled-components";
import randomColor from "random-color";

const Wrapper = styled.figure`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;
  max-width: 512px;
  box-sizing: border-box;
  transition: opacity 150ms ease-in-out;
  outline-color: blue;
  outline-width: 0;
  outline-offset: 2px;
  outline-style: none;
  outline-width: 4px;
  cursor: pointer;
  border: 2px solid black;
  transition: transform 50ms ease-in-out;

  &:focus {
    outline-style: dotted;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (min-width: 1024px) {
    outline-width: 6px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-bottom: 100%;
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
  align-items: center;
  flex: 1 1 auto;
  margin: 0;
  user-select: none;
`;

const Name = styled.p`
  flex: 4;
  margin: 0;
  padding: 0;
  font-size: 10px;
  padding: 8px;
  font-family: monospace, monospace;
  font-weight: bold;
  color: black;

  /* Truncate String with Ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 1024px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const Play = styled.button`
  flex: 1;
  align-self: stretch;
  cursor: pointer;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
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

const PlayIcon = styled.svg`
  display: block;
  margin: 0 auto;
  width: 14px;
  height: auto;
  fill: white;

  @media (min-width: 1024px) {
    width: 16px;
  }
`;

const PlayingIndicator = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  font-size: 30px;
`;

const SoundItem = ({ id, name, audio, image, onPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [color] = useState(() => randomColor(1, 1));

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
        <PlayingIndicator>{isPlaying && "🔊"}</PlayingIndicator>
        <Image src={image.src} alt={image.alt || image.name} />
      </ImageWrapper>
      <Caption>
        <Name>{name}</Name>
        <Play
          type="button"
          onClick={handleOnPlay}
          style={{ backgroundColor: color.hexString() }}
        >
          <PlayIcon
            enableBackground="new 0 0 320.001 320.001"
            viewBox="0 0 320.001 320.001"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m295.84 146.049-256-144c-4.96-2.784-11.008-2.72-15.904.128-4.928 2.88-7.936 8.128-7.936 13.824v288c0 5.696 3.008 10.944 7.936 13.824 2.496 1.44 5.28 2.176 8.064 2.176 2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z" />
          </PlayIcon>
        </Play>
      </Caption>
    </Wrapper>
  );
};

export default SoundItem;
