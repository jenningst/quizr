import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import AnswerItem from './AnswerItem';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
const NO_CHOICE_MADE = "You need to select at least 1 choice."

const Question = ({ question, submitResponses, isCorrect, getNextQuestion, attemptsLeft }) => {   
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [message, setMessage] = useState("");
  const [cumulativeSelections, setCumulativeSelections] = useState(0);
  
  useEffect(() => {
    function renderMessage() { setMessage(ERROR_MESSAGE) };
    if (attemptsLeft < 3) { renderMessage() };
    // answer was wrong and attempsLeft has updated; reset local choices
    setSelectedChoices([]);
  }, [attemptsLeft]);

  useEffect(() => {
    function renderMessage() {
      if (isCorrect) { setMessage(SUCCESS_MESSAGE) };
    }
    // isCorrect
    renderMessage();
  }, [isCorrect]);

  return (
    <QuestionWrapper className="question-wrapper">
      <QuestionTitle className="question-title">
        {question.title}
      </QuestionTitle>
      <AnswerList className="answer-list">
        {question.choices.map((choice, index) => (
          <AnswerItem
            key={index}
            index={index}
            choiceText={choice.text}
            isSelected={selectedChoices.includes(index) ? true : false}
            toggleIsChoice={selectChoice}
          />
        ))}
        <ActionWrapper className="action-buttons">
          {isCorrect
            ? <ActionButton 
                backgroundColor="#6121bf"
                borderColor="#4717a2"
                type="button" 
                onClick={fetchNextQuestion}
              >
                Next Question
              </ActionButton>
            : <ActionButton
                type="button" 
                onClick={submitChoices}
              >
                Submit
              </ActionButton>
          }
        </ActionWrapper>
      </AnswerList>
      <MessageBox className="message-box">
        {cumulativeSelections === 0 ? message : null}
      </MessageBox>
    </QuestionWrapper>
  );

  // Submits an array of selected choices for validation
  function submitChoices() {
    // if no selections have been made, alert
    if (selectedChoices.length < 1) {
      setMessage(NO_CHOICE_MADE);
      return;
    }
    // send all selected choices to parent
    submitResponses(selectedChoices);
    // allow message to be shown
    setCumulativeSelections(0); 
  }

  // Adds or removes a element from the selectedChoices state
  function selectChoice(index) {
    let selections = [...selectedChoices];
    if (!selections.includes(index)) { // selection not in state; add it
      selections.push(index);
    } else { // selection in state; remove it
      if (selections.length === 1) {
        selections = [];
      }
      selections.splice(selections.indexOf(index), 1);
    }
    // update state with element added or removed
    setSelectedChoices(selections);
    setCumulativeSelections(cumulativeSelections + 1);
  }

  // Sets a request to Quiz for the next question
  function fetchNextQuestion() {
    // reset our selected choices
    setSelectedChoices([]);
    // reset our cumulative selections
    setCumulativeSelections(0);
    // reset our messages
    setMessage("");
    // ask for the next question
    getNextQuestion();
  }
};

Question.propTypes = {
  question: PropTypes.shape({
    choices: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  submitResponses: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  getNextQuestion: PropTypes.func.isRequired,
  attemptsLeft: PropTypes.number.isRequired,
};

export default Question;

const QuestionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AnswerList = styled.section`
  width: 90%;
`;

const ActionWrapper = styled.div`
  height: 5em;
  width: 100%;
`;

const MessageBox = styled.section`
  height: 5em;
`;

const QuestionTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
`;

const ActionButton = styled(ButtonBase)`
  width: 100%;
  height: 4em;
  background: ${props => props.backgroundColor || "#4ACAB0"};
  border: 2px solid ${props => props.borderColor || "#1ABC9C"};
  color: ${props => props.primaryColor || "#FFFFFF"};
  font-size: 1em;
  font-weight: 700;
  outline: none;
`;