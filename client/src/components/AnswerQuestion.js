import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton, MediumButton, SmallButton } from './common/base/ButtonBase';
import QuestionChoice from './QuestionChoice';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
const NO_CHOICE_MADE = "You need to select at least 1 choice."

const AnswerQuestion = ({ 
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
  const allowSubmit = selectedChoices.length > 0;

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
      <Divider/>
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
          {renderButton()}
        </ActionWrapper>
      </ChoiceBank>
      <MessageBox className="message-box">
        {shouldDisplayMessage === 0 ? message : null}
      </MessageBox>
    </QuestionWrapper>
  );

  // Renders a button based on state
  function renderButton() {
    if (allowSubmit) {
      if (isAnswerCorrect) {
        return (
          <ActionButtonHighlighted 
            type="button" 
            onClick={fetchNextQuestion}
          >
            Next Question
          </ActionButtonHighlighted>
        );
      } else {
        return (
          <ActionButton
            type="button"
            onClick={submitChoices}
          >
            Submit
          </ActionButton>
        );
      }
    } else {
      return (
        <ActionButtonDisabled disabled>
          Select a Choice
        </ActionButtonDisabled>
      );
    }
  }

  // Submits an array of selected choices for validation
  function submitChoices() {
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

AnswerQuestion.propTypes = {
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

export default AnswerQuestion;

const QuestionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  background: #E6E7FF;
`;

const ChoiceBank = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;  
  height: 5em;
  width: 100%;
`;

const QuestionTitle = styled.h1`
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 2em;
  width: 90%;
`;

const Divider = styled.hr`
  background: #8B90FF;
  height: 1px;
  margin-bottom: 2em;
  outline: none;
  border: none;
  width: 90%;
`;

const ActionButton = styled(BigButton)`
  width: 90%;
  height: 4em;
  margin-top: 1em;
  font-size: 1em;
  font-weight: 700;
  background: #FFFFFF;
  color: #FFB3B3;
  border: none;
  outline: none;

  &:hover {
    border: 2px solid #FFE6E6;
  }
`;

const ActionButtonDisabled = styled(ActionButton)`
  color: #FFE6E6;

  &:hover {
    border: none;
  }
`;

const ActionButtonHighlighted = styled(ActionButton)`
  background: #FFCC99;
  color: #FFFFFF;

  &:hover {
    border: none;
  }
`;

const MessageBox = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;  
  height: 5em;
`;
