import React from 'react';
import styled from 'styled-components';

import constants from '../../constants';

const Container = styled.div`
  width: 500px;
  height: 500px;

  border: 5px dashed ${constants.darkbackground};
` 

function Screen() {
  return (
    <Container>

    </Container>
  )
}

export default Screen;