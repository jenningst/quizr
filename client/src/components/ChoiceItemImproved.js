import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './common/base/ButtonBase';
// import Icon from './common/base/Icon';
import ICONS from '../constants/icons';
import styled from 'styled-components';
import shortid from 'shortid';
// import Form from './common/Form';

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
  
  return (
    <ChoiceGroupWrapper 
      className="choice-group"
      key={index}
      highlight={isAnswer}
    >
      <EditableContent>
        {choiceText}
      </EditableContent>
      <EmbeddedButton
        type="button"
        onClick={e => toggleIsAnswer(index)}
      >
        {"IS ANSWER?"}
      </EmbeddedButton>
      <EmbeddedButton
        type="button"
        onClick={e => deleteChoice(index)}
      >
        {"DELETE"}
      </EmbeddedButton>
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
  justify-content: flex-start;
  align-items: center;
  background: ${props => props.highlight ? "#8B90FF" : "#FFFFFF"};
  color: ${props => props.highlight ? "#FFFFFF" : "#8B90FF"};
  padding-top: .5em;
  padding-bottom: .5em;
  width: 100%;
  border-radius: 5px;

  & > button {
    margin-left: .5em;
    margin-right: .5em;
  }
`;

const EditableContent = styled.div`
  flex-grow: 2;
  font-family: 'Montserrat', sans-serif;
  padding-left: 1em;
`;

const EmbeddedButton = styled(ButtonBase)`
  text-align: center;
  vertical-align: center;
  font-size: .75em;
  font-weight: 700;
  padding: 1em;
  margin-right: .5em;
  background: #CCCCCF;
  color: #FFFFFF;
  outline: none;
  border: none;

  &:hover {
    background: #8B90FF;
  }
`;

const HighlightedButton = styled(EmbeddedButton)`
  background: #85d9bf;
`;