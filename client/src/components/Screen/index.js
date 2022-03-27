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

  position: relative;
` 

function Screen({ setFile, filterName }) {

  return (
    <Container>
      <Camera filterName={filterName} setFile={(file) => setFile(file)}/>
    </Container>
  )
}

export default Screen;