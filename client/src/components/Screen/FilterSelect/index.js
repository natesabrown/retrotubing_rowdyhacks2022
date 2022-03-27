import React, { useState } from 'react';
import styled from 'styled-components';
import down_arrow from './down_arrow.png';

import constants from '../../../constants';

const SelectElement = styled.div`
  font-size: 40px;
  width: 150px;
  height: 60px;
  background-color: white;
  border: 6px solid ${constants.darkbackground};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    cursor: pointer;
  }

  ${props => props.isSelected && `
    background-color: cyan;
    color: ${constants.darkbackground};
  `}
`

const Text = styled.div`
  
`

const Toggle = styled.div`
  img {
    width: 40px;

    transform: translateY(3px);

    ${props => props.showOptions && `
      transform: rotate(180deg);
    `}
  }
`


const options = [
  {
    name: 'Neue',
    id: 'neue'
  },
  {
    name: "Static",
    id: "yellow_casino"
  },
  {
    name: "Turtle",
    id: "extra_offset_green"
  },
  {
    name: "Chill",
    id: "serenity"
  }
]

function getNameFromOptions(id) {
  for (let option of options) {
    if (option.id == id) {
      return option.name;
    }
  }
}

function FilterSelect({ filterName, setFilterName }) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
    <SelectElement onClick={() => setShowOptions(!showOptions)} isSelected>
      <Text>{getNameFromOptions(filterName)}</Text>
      <Toggle
        showOptions={showOptions}
      ><img src={down_arrow}></img></Toggle>
    </SelectElement>
    {showOptions && <>
      {options.map((option, index) => {

        return (
        <SelectElement style={{
          position: 'absolute',
          transform: `translateY(${(60 * (index + 1))}px)`
        }} onClick={() => {
          setFilterName(option.id);
          setShowOptions(false);
        }}
        isSelected={option.id == filterName}
        >
          <Text>{option.name}</Text>
        </SelectElement>
      )})}
    </>}
    </>
  )
}

export default FilterSelect;