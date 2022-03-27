import React from "react";
import styled from "styled-components";

import constants from '../../constants';
import down_arrow from "./down_arrow.png";

const Holder = styled.div`
  width: 515px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
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

function DownloadBar() {
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
      <Holder>
        <DownloadButton>
          <img src={down_arrow} />
        </DownloadButton>
      </Holder>
    </>
  );
}

export default DownloadBar;
