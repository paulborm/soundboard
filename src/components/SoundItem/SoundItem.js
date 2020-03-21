import React, { useState, useRef } from "react";
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

  &:focus {
    outline-width: 4px;

    @media (min-width: 1024px) {
      outline-width: 8px;
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

  /* &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  } */
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
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleKeyPress = event => {
    event.preventDefault();
    if (event.which === 13 || event.which === 32) {
      handleOnPlay();
    }
    return;
  };

  const handleOnPlay = event => {
    event && event.preventDefault();

    if (!onPlay) {
      return;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    onPlay({ id });
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
      <audio
        ref={audioRef}
        src={audio.src}
        onPlaying={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
      />
      <Caption>
        <Name>{name}</Name>
        <Play type="button" onClick={handleOnPlay}>
          <PlayIcon role="img" aria-label="hidden">
            {isPlaying ? "🔊" : "🔈"}
            {/* 🔇 */}
          </PlayIcon>
        </Play>
      </Caption>
    </Wrapper>
  );
};

export default SoundItem;
