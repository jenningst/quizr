import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SmallButton } from './common/base/ButtonBase';
import styled from 'styled-components';
import Markdown from 'markdown-to-jsx';

const ChoiceItem = ({
  index,
  allowMarkdown,
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
        {allowMarkdown ? (
          isEditable ? (
            <EditableTextArea
              rows="3"
              cols="20"
              value={inputValue}
              onChange={handleInputChange}
            />
          ) : ( 
            <DisabledTextArea
              rows="3"
              cols="20"
              value={choiceText}
              onClick={toggleIsEditable}
              readOnly
            />
          )
        ) : (
          isEditable ? (
            <EditableInput
              value={inputValue}
              onChange={handleInputChange}
            />
          ) : ( 
            <DisabledInput
              value={choiceText}
              onClick={toggleIsEditable}
              readOnly
            />
          )
        )
        }
      </EditableContentContainer>
      {!isEditable
        ? (
           <>
              <EmbeddedButton
                type="button"
                onClick={e => toggleIsAnswer(index)}
              >
                {"Is Answer"}
              </EmbeddedButton>
              <EmbeddedButton
                type="button"
                onClick={e => deleteChoice(index)}
              >
                {"Delete"}
              </EmbeddedButton>
            </>
          ) : (
            <>
              <EmbeddedButton
                type="button"
                onClick={onSave}
              >
                {"Save"}
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
  allowMarkdown: PropTypes.bool.isRequired,
  choiceText: PropTypes.string.isRequired,
  isAnswer: PropTypes.bool.isRequired,
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
  width: 100%;
  border-radius: 2px;

  & input {
    color: ${props => props.highlight ? "#FFFFFF" : "#8B90FF"};
  }
`;

const EditableContentContainer = styled.div`
  flex-grow: 2;
  font-family: 'Montserrat', sans-serif;
`;

const DisabledTextArea = styled.textarea`
  flex-grow: 2;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: #8B90FF;
  outline: none;
  border: none;
  background: none;

  resize: none;
  padding: .2em .5em .2em .5em;

  &:hover {
    border-bottom: 1px dotted #8B90FF;
  }
`;

const EditableTextArea = styled(DisabledTextArea)`
  background: none;
  &:hover {
    border-bottom: none;
  }
`;

const DisabledInput = styled.input`
  flex-grow: 2;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: #8B90FF;
  outline: none;
  border: none;
  background: none;

  padding: .2em .5em .2em .5em;

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

const EmbeddedButton = styled(SmallButton)`
  font-size: .8em;
  margin-right: .5em;
  background: #CCCCCF;
  color: #FFFFFF;
  outline: none;
  border: none;

  &:hover {
    background: #8B90FF;
  }
`;