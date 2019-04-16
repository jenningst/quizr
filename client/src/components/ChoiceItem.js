import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from './common/InputField';
import Button from './common/Button';
import Icon from './common/base/Icon';
import ICONS from '../constants/icons';
import styled from 'styled-components';
import shortid from 'shortid';

// TODO: create some visual artifact to display the input is an answer

const ChoiceItem = ({
  index,
  isAnswer,
  updateChoice,
  deleteChoice,
  toggleIsAnswer
}) => {
  // Local state for handling input changes
  const [inputValue, setInputValue] = useState("");
  console.log(ICONS.TRASH);
  
  return (
    <ChoiceGroupWrapper className="choice-group" key={index}>
      <InputField 
        type="text"
        name={`choice-${index}`}
        placeholder="Enter Choice Text..."
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
      <Button type="button" onClick={e => toggleIsAnswer(index)}>
        <SuccessIcon viewBox={ICONS.SUCCESS.viewBox}
          imageData={ICONS.SUCCESS}
        >
          {renderSvgPath(ICONS.SUCCESS.paths)}
        </SuccessIcon>
      </Button>
      <Button type="button" onClick={e => deleteChoice(index)}>
        <DeleteIcon viewBox={ICONS.TRASH.viewBox}>
          {renderSvgPath(ICONS.TRASH.paths)}
        </DeleteIcon>
      </Button>
    </ChoiceGroupWrapper>
  );

  // Handle input changes and update state
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  // Saves the input when the field loses focus
  function onBlur(e) {
    const inputPayload = { // create a payload to match state
      index,
      text: inputValue,
      isAnswer,
    };
    updateChoice(inputPayload); // send update to parent
  }

  // Renders path elements for an svg
  function renderSvgPath(paths) {
    return (
      paths.map(path => (
        <path
          key={shortid.generate()}
          d={path}
        />
      ))
    );
  }
};

export default ChoiceItem;

ChoiceItem.propTypes = {
  index: PropTypes.number.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsAnswer: PropTypes.func.isRequired,
};

const ChoiceGroupWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;


  & > button {
    margin-left: .25em;
  }
`;

const DeleteIcon = styled.svg`
  fill: red;
  color: red;
  height: 1.5em;
  width: 1.5em;
`;

const SuccessIcon = styled.svg`
  fill: black;
  height: 1.5em;
  width: 1.5em;
`;