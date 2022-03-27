import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import play from './play.png';
import stop from './stop.png';

import constants from '../../constants';
import Camera from '../Camera';

const Container = styled.div`
  width: 500px;
  height: 500px;
  padding: 10px;
  border: 7px dashed ${constants.darkbackground};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
` 

const bubble = keyframes`
  0% {
    transform: translateY(0px);
  } 
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`

const PlayButton = styled.div`
  position: absolute;
  bottom: 125px;
  img {
    width: 70px;
    image-rendering: pixelated;
  }

  &:hover {
    cursor: pointer;

    ${props => props.notplaying && css`img {
      animation: ${bubble} 0.5s infinite;
    }`}
  }
`

function Screen({ filterName }) {
  const [recording, setRecording] = useState(false);

  return (
    <Container>
      <Camera recording={recording} filterName={filterName} />
      <PlayButton onClick={() => setRecording(!recording)} notplaying={!recording}>
        <img src={recording ? stop : play} />
      </PlayButton>
    </Container>
  )
}

export default Screen;