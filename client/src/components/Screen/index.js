import React, { useState } from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Camera from '../Camera';
import TextBox from './TextBox/TextBox';

const Container = styled.div`
  width: 500px;
  height: 500px;

  border: 5px dashed ${constants.darkbackground};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
` 

const PlayButton = styled.div`
  background-color: orange;
  width: 30px;
  height: 30px;
  border: 3px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
  }
`

function Screen() {
  const [recording, setRecording] = useState(false);

  return (
    <Container>
      <TextBox 
        recording={recording}
      />
      <Camera />
      <PlayButton onClick={() => setRecording(!recording)}>
        {recording ? '◼' : '▶'}
      </PlayButton>
    </Container>
  )
}

export default Screen;