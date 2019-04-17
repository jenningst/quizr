import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from './common/base/ButtonBase';
import ICONS from '../constants/icons';
import styled from 'styled-components';
import shortid from 'shortid';

const ChoiceItem = ({
  index,
  choiceText,
  isAnswer,
  updateChoice,
  deleteChoice,
  toggleIsAnswer
}) => {
  // Local state for handling input changes and editable status
  const [inputValue, setInputValue] = useState(choiceText);
  const [isEditable, setIsEditable] = useState(false);
  
  return (
    <ChoiceGroupWrapper 
      className="choice-group"
      key={index}
      highlight={isAnswer}
    >
      <EditableContentContainer
        className="toggle-editable-container"
      >
        {isEditable
          ? <EditableInput
              value={inputValue}
              onChange={handleInputChange}
            />
          : <DisabledInput
              value={choiceText}
              onClick={toggleIsEditable}
              readOnly
            />
        }
      </EditableContentContainer>
      {!isEditable
        ? (
           <>
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
            </>
          ) : (
            <>
              <EmbeddedButton
                type="button"
                onClick={onSave}
              >
                {"SAVE"}
              </EmbeddedButton>
            </>
          )
      }
    </ChoiceGroupWrapper>
  );

  // Handle input changes and update state
  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  // Toggles a field's editable state
  function toggleIsEditable() {
    setIsEditable(!isEditable);
  }

  // Saves the input when the field loses focus
  function onSave() {
    setIsEditable(!isEditable);
    const inputPayload = { // create a payload to match state
      index,
      text: inputValue,
      isAnswer,
    };
    updateChoice(inputPayload); // send payload to parent
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

  & input {
    color: ${props => props.highlight ? "#FFFFFF" : "#8B90FF"};
  }
`;

const EditableContentContainer = styled.div`
  flex-grow: 2;
  font-family: 'Montserrat', sans-serif;
  margin-left: 1em;
  margin-right: .5em;
`;

const DisabledInput = styled.input`
  flex-grow: 2;
  width: 100%
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: #8B90FF;
  outline: none;
  border: none;
  background: none;

  &:hover {
    border-bottom: 1px dotted #8B90FF;
  }
`;

const EditableInput = styled(DisabledInput)`
  background: none;
  &:hover {
    border-bottom: none;
  }
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