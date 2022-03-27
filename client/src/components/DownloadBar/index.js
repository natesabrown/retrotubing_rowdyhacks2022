import React from "react";
import styled from "styled-components";

import constants from '../../constants';
import down_arrow from "./down_arrow.png";
import FilterSelect from '../Screen/FilterSelect';

const Holder = styled.div`
  width: 515px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3px;
`;

const DownloadButton = styled.div`
  img {
    width: 50px;
  }
  padding: 6px;
  background-color: ${constants.darkbackground};
  border: 5px solid black;
  &:hover {
    background-color: #472A76;
    cursor: pointer;
  }
  transform: scale(0.9);
  
`;

const HelpText = styled.div`
  color: ${constants.darkbackground};
  font-size: 24px;
  margin-top: 15px;
`

function DownloadBar({ filterName, setFilterName }) {
  return (
    <>
        <div
          style={{
            borderTop: "6px solid",
            borderColor: "#854EDB",
            width: 515,
            marginTop: 30,
          }}
        ></div>
        <HelpText>Select Filter:</HelpText>
      <Holder>
        <FilterSelect 
          filterName={filterName}
          setFilterName={setFilterName}
        />
        <DownloadButton>
          <img src={down_arrow} />
        </DownloadButton>
      </Holder>
    </>
  );
}

export default DownloadBar;
