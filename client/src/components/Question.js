import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import QuestionChoice from './QuestionChoice';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
const NO_CHOICE_MADE = "You need to select at least 1 choice."

const Question = ({ 
  questionData,
  totalAttemptsAllowed,
  remainingAttempts,
  gradeResponse,
  isFeedbackEnabled,
  isAnswerCorrect,
  getNextQuestion,
}) => {
  // Local state for managing 
  // (a) choice selection
  // (b) whether to display feedback to the user
  // (c) feedback text
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [message, setMessage] = useState("");
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(0);

  // Renders error message and clear inputs if question was answered wrong
  useEffect(() => {
    function renderMessage() { setMessage(ERROR_MESSAGE) };
    // if remaining attempts === totalAttemptsAllowed, questionData is being rendered for the 
    // first time; if on 1 + Nth attempt, allow rendering of a message to user
    if (remainingAttempts !== totalAttemptsAllowed && isFeedbackEnabled) { 
      renderMessage();
    };
    setSelectedChoices([]);
  }, [remainingAttempts]);

  // Render a success message if question was answered right
  useEffect(() => {
    function renderMessage() {
      if (isAnswerCorrect && isFeedbackEnabled) { setMessage(SUCCESS_MESSAGE) };
    }
    renderMessage();
  }, [isAnswerCorrect]);

  return (
    <QuestionWrapper className="question-wrapper">
      <QuestionTitle className="question-title">
        {questionData.title}
      </QuestionTitle>
      <ChoiceBank className="choice-list">
        {questionData.choices.map((choice, index) => (
          <QuestionChoice
            key={index}
            index={index}
            choiceText={choice.text}
            isSelected={selectedChoices.includes(index) ? true : false}
            toggleIsSelected={selectChoice}
          />
        ))}
        <ActionWrapper className="action-buttons">
          {isAnswerCorrect
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
      </ChoiceBank>
      <MessageBox className="message-box">
        {shouldDisplayMessage === 0 ? message : null}
      </MessageBox>
    </QuestionWrapper>
  );

  // Submits an array of selected choices for validation
  function submitChoices() {
    // no selections have been made, update feedback message
    if (selectedChoices.length < 1) {
      setMessage(NO_CHOICE_MADE);
      return;
    }
    // start grading
    if (isFeedbackEnabled) {
      // grade the response and allow user to see feedback message
      gradeResponse(selectedChoices);
      setShouldDisplayMessage(0); 
    } else {
      // grade response and immediately get next question (i.e. skip feedback)
      gradeResponse(selectedChoices);
      fetchNextQuestion();
    }
  }

  // Adds or removes a element from the selectedChoices state
  function selectChoice(index) {
    let selections = [...selectedChoices];
    // determine if we should add or remove the selection (i.e. toggle it)
    !selections.includes(index) 
      ? selections.push(index)
      : selections.splice(selections.indexOf(index), 1);
    // update state with element added or removed
    setSelectedChoices(selections);
    setShouldDisplayMessage(shouldDisplayMessage + 1);
    return;
  }

  // fetches the next question in a set
  function fetchNextQuestion() {
    setSelectedChoices([]); // clean up any selected choices
    setShouldDisplayMessage(0); // reset feedback to show
    setMessage(""); // clean up any feedback
    getNextQuestion(); // get next question in set
  }
};

Question.propTypes = {
  questionData: PropTypes.shape({
    choices: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  gradeResponse: PropTypes.func.isRequired,
  totalAttemptsAllowed: PropTypes.number.isRequired,
  isFeedbackEnabled: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  getNextQuestion: PropTypes.func.isRequired,
  remainingAttempts: PropTypes.number.isRequired,
};

export default Question;

const QuestionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ChoiceBank = styled.section`
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