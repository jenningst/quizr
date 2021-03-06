import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from '../common/Button';
import { SmallInput } from '../common/Input';
// import OptionsCard from '../OptionsCard';

const ChoiceItem = ({
  index,
  choiceText,
  isAnswer,
  updateChoice,
  deleteChoice,
  toggleIsAnswer
}) => {
  const [inputText, setInputText] = useState(choiceText);
  const [isEditable, setIsEditable] = useState(false);

  return (
    <ChoiceItemWrapper
      className="choice-item-wrapper"
      key={index}
      highlight={isAnswer}
      >
        {!isEditable
          ? (
            <>
              <Label>{inputText}</Label>
              <AnswerButton
                onClick={toggleAnswer}
                active={isAnswer ? 'active' : null}
              >
                {isAnswer ? "Remove as Answer" : "Mark as Answer"}
              </AnswerButton>
              <EditButton onClick={toggleIsEditable}>
                {"..."}
              </EditButton>
              <EditButton onClick={handleDelete}>
                {"Delete"}
              </EditButton>
            </>
          ) : (
            <>
              <Input
                placeholder="input text ..."
                value={inputText}
                onChange={handleInputChange}
              />
              <SaveButton onClick={onSave}>
                {"Save"}
              </SaveButton>
            </>
          )
        }
    </ChoiceItemWrapper>
  );

  // Handles choice delete
  function handleDelete(){
    deleteChoice(index);
  }

  // Handle input field changes
  function handleInputChange(e) {
    setInputText(e.target.value);
  }

  // Toggles a field's editable state
  function toggleIsEditable() {
    setIsEditable(!isEditable);
  }

  // Toggles indicator whether choice is an answer
  function toggleAnswer() {
    toggleIsAnswer(index);
  }

  // Saves the input when the field loses focus
  function onSave() {
    setIsEditable(!isEditable);
    const inputPayload = { // create a payload to match state
      text: inputText,
      isAnswer,
    };
    updateChoice(index, inputPayload); // send payload to parent
  }
};

ChoiceItem.propTypes = {
  index: PropTypes.number.isRequired,
  choiceText: PropTypes.string.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsAnswer: PropTypes.func.isRequired,
};

export default ChoiceItem;

const ChoiceItemWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  color: #48494e;
  background: #ffffff;

  & :first-child {
    margin-left: 1em;
  }

  & > * {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 1em;
  }
`;

const Label = styled.div`
  flex-grow: 2;

  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border: 2px solid #ffffff;
`;

const Input = styled(SmallInput)`
  flex-grow: 2;

  border: 2px solid #ffffff;
  border-bottom: 2px solid #7358f7;
`;

const AnswerButton = styled(SmallButton)`
  font-size: .50em;
  padding-left: 1em;
  padding-right: 1em;
  outline: none;
  background: ${props => props.active ? "#7358f7" : "none"};
  color: ${props => props.active ? "#ffffff" : "#c7c7c7"};
  border: ${props => props.active ? "1px solid #7358f7" : "1px solid #c7c7c7"};

  &:hover {
    background: ${props => props.active ? "#8b90ff" : "none"};
    color: ${props => props.active ? "#ffffff" : "#7358f7"};
    border: ${props => props.active ? "1px solid #8b90ff" : "1px solid #7358f7"};
  }
`;

const SaveButton = styled(SmallButton)`
  font-size: .50em;
  padding-left: 1em;
  padding-right: 1em;
  outline: none;
  background: #7358f7;
  color: #ffffff;

  &:hover {
    background: #8b90ff;
  }
`;

const EditButton = styled(AnswerButton)`

`;