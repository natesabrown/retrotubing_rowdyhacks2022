import React, { useEffect, useState } from "react";
import styled from "styled-components";

import constants from '../../constants';
import down_arrow from "./down_arrow.png";
import FilterSelect from '../Screen/FilterSelect';

import earth from './earth.png';
import moon from './moon.png';
import rocket from './rocket.png';
import comet from './comet.png';

const Earth = styled.img`
  position: absolute;
  height: 210px;
  width: 240px !important;
  right: -300px;
  bottom: 120px;

  ${props => props.up && `
    transform: translateY(-10px);
  `}
`

const Moon = styled.img`
  position: absolute;
  height: 130px;
  width: 14 !important;
  left: -270px;
  bottom: 250px;

  ${props => props.up && `
    transform: translateY(-10px);
  `}
`

const Rocket = styled.img`
  position: absolute;
  height: 140px;
  width: 160px;
  right: -300px;
  bottom: 350px;
  transform: scaleX(-1);

  ${props => !props.up && `
    transform: scaleX(-1) translateY(-10px);
  `}
`

const Comet = styled.img`
  position: absolute;
  height: 110px;
  width: 130px;
  left: -200px;
  bottom: 80px;

  transform: rotate(30deg);;

  ${props => !props.up && `
    transform: rotate(45deg) translateY(-10px);
  `}
`

const Holder = styled.div`
  width: 535px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3px;
  position: relative;
`;

const DownloadButton = styled.div`
  img {
    width: 50px;
  }
  padding: 6px;
  background-color: ${constants.darkbackground};
  border: 5px solid black;
  transform: scale(0.9);
  position: relative;
  ${props => !props.filePresent && `
    opacity: 0.5
  `}
  ${props => props.filePresent && `
    &:hover {
      background-color: #472A76;
      cursor: pointer;
    }
  `}
`;

const HelpText = styled.div`
  color: ${constants.darkbackground};
  font-size: 24px;
  margin-top: 15px;
`

function DownloadBar({ download, filterName, setFilterName, file }) {
  const [up, setUp] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setUp(!up);
    }, 500);
    return () => clearInterval(timer);
  }, [up]);

  return (
    <>
        <div
          style={{
            borderTop: "6px solid",
            borderColor: "#854EDB",
            width: 535,
            marginTop: 30,
          }}
        ></div>
        <HelpText>Select Filter:</HelpText>
      <Holder>
        <Moon src={moon} up={up} />
        <Rocket src={comet} up={up} />
        <Comet src={rocket} up={up} />
        <Earth src={earth} up={up} />
        <FilterSelect 
          filterName={filterName}
          setFilterName={setFilterName}
        />
        <DownloadButton onClick={() => download()} filePresent={file ? true : false}>
          <img src={down_arrow} />
        </DownloadButton>
      </Holder>
    </>
  );
}

export default DownloadBar;
