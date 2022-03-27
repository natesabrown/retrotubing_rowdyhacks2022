import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Navigation from './components/Navigation';
import Screen from './components/Screen';
import DownloadBar from './components/DownloadBar';
import Information from './components/Information';
import FilterSelect from './components/Screen/FilterSelect';

import constants from './constants';

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    background-color: ${constants.background};
    font-family: 'VT323', monospace;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`

function App() {
  const [filterName, setFilterName] = useState("neue");
  const [file, setFile] = useState();

  const download = () => {
    if(file){
      console.log(file);
      const link = document.createElement('a');
      link.href = file;
      link.setAttribute('download', 'recording');
      link.setAttribute('target', '_blank');
      link.click();
    }
  }

  return (
    <>
    <GlobalStyle />
    <Navigation />
    <Container>
      <SubContainer>
        <Screen filterName={filterName} setFile={(file) => setFile(file)}/>
        <DownloadBar filterName={filterName} setFilterName={setFilterName} download={() => download()}/>
        <Information />
      </SubContainer>
    </Container>
    
    </>
  );
}

export default App;
