import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './common/base/ButtonBase';
import Icon from './common/base/Icon';
import ICONS from '../constants/icons';
import styled from 'styled-components';
import shortid from 'shortid';
import Form from './common/Form';

// TODO: create some visual artifact to display the input is an answer

const ChoiceItem = ({
  index,
  choiceText,
  isAnswer,
  updateChoice,
  deleteChoice,
  toggleIsAnswer
}) => {
  // Local state for handling input changes
  const [inputValue, setInputValue] = useState("");
  
  // render div: isAnswer | choiceText | delete
  
  return (
    <ChoiceGroupWrapper className="choice-group" key={index}>
      <ButtonBase type="button" onClick={e => toggleIsAnswer(index)}>
        <SuccessIcon viewBox={ICONS.SUCCESS.viewBox}
          imageData={ICONS.SUCCESS}
        >
          {renderSvgPath(ICONS.SUCCESS.paths)}
        </SuccessIcon>
      </ButtonBase>
      {choiceText}
      <ButtonBase type="button" onClick={e => deleteChoice(index)}>
        <DeleteIcon viewBox={ICONS.TRASH.viewBox}>
          {renderSvgPath(ICONS.TRASH.paths)}
        </DeleteIcon>
      </ButtonBase>
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
  choiceText: PropTypes.string.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsAnswer: PropTypes.func.isRequired,
};

const ChoiceGroupWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  padding-top: .5em;
  padding-bottom: .5em;
  width: 100%;
  border-radius: 5px;
`;

const DeleteIcon = styled.svg`
  fill: red;
  color: red;
  height: 100%
  width: 1.5em;
`;

const SuccessIcon = styled.svg`
  fill: black;
  height: 1.5em;
  width: 1.5em;
`;