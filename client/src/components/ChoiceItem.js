import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton, MediumButton, SmallButton } from './common/base/ButtonBase';
import { BigInput, MediumInput, SmallInput } from './common/base/InputBase';
import Button from 'react-bootstrap';
import OptionsCard from './OptionsCard';
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
  const [displayMenu, setDisplayMenu] = useState(false);
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
              <Label>
                {allowMarkdown 
                  ? <Markdown options={{ forceBlock: true }}>
                      {inputText}
                    </Markdown>
                  : <>{inputText}</>
                }
                
              </Label>
              <AnswerButton
                onClick={toggleAnswer}
                active={isAnswer ? 'active' : null}
              >
                {isAnswer ? "Remove as Answer" : "Mark as Answer"}
              </AnswerButton>
              <EditButton onClick={toggleIsEditable}>
                {"..."}
              </EditButton>
            </>
          ) : (
            <>
              {allowMarkdown
                ? (
                  <TextArea
                    rows="3"
                    cols="20"
                    placeholder="text area text..."
                    value={inputText}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Input
                    placeholder="input text ..."
                    value={inputText}
                    onChange={handleInputChange}
                  />
                )
              }
              <SaveButton onClick={onSave}>
                {"Save"}
              </SaveButton>
            </>
          )
        }
    </ChoiceItemWrapper>
  );

  // Toggles displayMenu state and displays/hides the OptionsCard component
  function toggleEditMenu(){
    setDisplayMenu(!displayMenu)
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
      index,
      text: inputText,
      isAnswer,
    };
    updateChoice(inputPayload); // send payload to parent
  }
};

ChoiceItem.propTypes = {
  index: PropTypes.number.isRequired,
  allowMarkdown: PropTypes.bool.isRequired,
  choiceText: PropTypes.string.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsAnswer: PropTypes.func.isRequired,
};

export default ChoiceItem;

const ChoiceItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
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

const TextArea = styled.textarea`
  flex-grow: 2;
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  padding: .50em
  border: none;
  resize: none;
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