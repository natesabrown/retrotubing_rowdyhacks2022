import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';
import Camera from '../Camera';

const Container = styled.div`
  width: 500px;
  height: 500px;

  border: 5px dashed ${constants.darkbackground};

  display: flex;
  align-items: center;
  justify-content: center;
` 

function Screen() {
  return (
    <Container>
      <Camera />
    </Container>
  )
}

export default Screen;