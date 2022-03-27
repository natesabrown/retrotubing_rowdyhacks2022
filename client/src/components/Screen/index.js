import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Camera from '../Camera';

const Container = styled.div`
  width: 500px;
  height: 500px;
  padding: 10px;
  border: 7px dashed ${constants.darkbackground};
  background-color: ${constants.darkbackground}50;

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