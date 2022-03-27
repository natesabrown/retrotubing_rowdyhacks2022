import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useReactMediaRecorder } from 'react-media-recorder';

import play from './play.png';
import stop from './stop.png';

import constants from '../../constants';
import Camera from '../Camera';
import TextBox from './TextBox/TextBox';

const Container = styled.div`
  width: 500px;
  height: 500px;

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
  margin-top: 20px;

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

  // const {
  //   status, startRecording, stopRecording, mediaBlobUrl
  // } = useReactMediaRecorder({ screen: true });

  // function onButtonClick(buttonState) {
  //   if (buttonState == true) {
  //     // handle saving, etc
  //     stopRecording();
  //     console.log(mediaBlobUrl);
  //   } else {
  //     // start stuff
  //     startRecording();
  //   }
  //   // reverse button state
  //   setRecording(!recording);
  // }

  return (
    <Container>
      <TextBox 
        recording={recording}
      />
      <Camera filterName={filterName} />
      <PlayButton onClick={() => setRecording(!recording)} notplaying={!recording}>
        <img src={recording ? stop : play} />
      </PlayButton>
    </Container>
  )
}

export default Screen;