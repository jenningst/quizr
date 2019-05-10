import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton } from '../common/Button';
import QuestionChoice from './QuestionChoice';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
// const NO_CHOICE_MADE = "You need to select at least 1 choice."

const Question = ({ 
  question,
  totalAttemptsAllowed,
  remainingAttempts,
  gradeResponse,
  isFeedbackEnabled,
  isAnswerCorrect,
  fetchNextQuestion,
}) => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [message, setMessage] = useState("");
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(true);
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
      <QuestionBody>
        <Title>{question.title}</Title>
        <ChoiceBank className="choice-bank">
          {question.choices.map((choice) => (
            <QuestionChoice
              key={choice._id}
              index={choice._id}
              text={choice.text}
              isSelected={selectedChoices.includes(choice._id) ? true : false}
              toggleIsSelected={selectChoice}
            />
          ))}
        </ChoiceBank>

      </QuestionBody>
      <QuestionFooter className="action-buttons">
        {renderButton()}
        <MessageBox className="message-box">
          {shouldDisplayMessage ? message : null}
        </MessageBox>
      </QuestionFooter>
    </QuestionWrapper>
  );

  // Renders a button based on state
  function renderButton() {
    if (allowSubmit) {
      if (isAnswerCorrect) {
        return (
          <ActionButtonHighlighted 
            type="button" 
            onClick={handleStepQuestion}
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

  /**
   * submitChoices: Submits an array of selected choices for validation
   */
  function submitChoices() {
    if (isFeedbackEnabled) {
      // allow user to see feedback message
      gradeResponse(selectedChoices);
      setShouldDisplayMessage(0); 
    } else {
      // grade response and immediately get next question (i.e. skip feedback)
      gradeResponse(selectedChoices);
      fetchNextQuestion();
    }
  }

  /**
   * selectChoice: Adds or removes a element from the selectedChoices state
   */
  function selectChoice(id) {
    let selections = [...selectedChoices];
    // determine if we should add or remove the selection (i.e. toggle it)
    !selections.includes(id) 
      ? selections.push(id)
      : selections.splice(selections.indexOf(id), 1);
    // update state with element added or removed
    setSelectedChoices(selections);
    setShouldDisplayMessage(false);
    return;
  }

  /**
   * handleStepQuestion: Fetches the next question in a set
   */
  function handleStepQuestion() {
    setSelectedChoices([]); // clear selected choices
    setShouldDisplayMessage(0); // reset feedback to show
    setMessage(""); // clear feedback
    fetchNextQuestion(); // get next question
  }
};

Question.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
  }).isRequired,
  gradeResponse: PropTypes.func.isRequired,
  totalAttemptsAllowed: PropTypes.number.isRequired,
  isFeedbackEnabled: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  fetchNextQuestion: PropTypes.func.isRequired,
  remainingAttempts: PropTypes.number.isRequired,
};

export default Question;

const QuestionWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 3em;
  grid-template-areas:
    "main"
    "footer";
  grid-row-gap: .50em;
  height: 100%;
`;

const QuestionBody = styled.div`
  grid-area: main;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.25em;
`;

const ChoiceBank = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;

const QuestionFooter = styled.div`
  grid-area: footer;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;  
`;

const ActionButton = styled(BigButton)`
  border: none;
  outline: none;

  &:hover {
    border: 2px solid #FFE6E6;
  }
`;

const ActionButtonDisabled = styled(ActionButton)`
  &:hover {
    border: none;
  }
`;

const ActionButtonHighlighted = styled(ActionButton)`
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
