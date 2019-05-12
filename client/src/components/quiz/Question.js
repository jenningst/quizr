import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BigButton } from '../common/Button';
import QuizQuestionChoice from './QuizQuestionChoice';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
const RAN_OUT_OF_ATTEMPTS = "You ran out of attempts. Here was the correct answer";

const Question = ({ 
  question,
  totalAttemptsAllowed,
  remainingAttempts,
  gradeResponse,
  isFeedbackEnabled,
  isCorrect,
  fetchNextQuestion,
  answerKey
}) => {
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [message, setMessage] = useState("");
  const [shouldDisplayMessage, setShouldDisplayMessage] = useState(true);
  const allowSubmit = 
    selectedChoices.length > 0 ||
    answerKey.length > 0 ||
    isCorrect;

  // Renders error message and clear inputs if question was answered wrong
  useEffect(() => {
    function renderMessage() { 
      setMessage(ERROR_MESSAGE)
    };
    // if remaining attempts === totalAttemptsAllowed, questionData is being rendered for the 
    // first time; if on 1 + Nth attempt, allow rendering of a message to user
    if (remainingAttempts !== totalAttemptsAllowed && isFeedbackEnabled) { 
      renderMessage();
    };
    if (remainingAttempts === 0 && isFeedbackEnabled) {
      setMessage(RAN_OUT_OF_ATTEMPTS);
    }
    setSelectedChoices([]);
  }, [remainingAttempts]);

  // Render a success message if question was answered right
  useEffect(() => {
    function renderMessage() {
      if (isCorrect && isFeedbackEnabled) { setMessage(SUCCESS_MESSAGE) };
    }
    renderMessage();
  }, [isCorrect]);

  return (
    <QuestionWrapper className="question-wrapper">

      <QuestionBody>
        <Title>{question.title}</Title>
        {remainingAttempts === 0
          ? (
            <ChoiceBank className="choice-bank">
              {question.choices.map((choice) => (
                <QuizQuestionChoice
                  key={choice._id}
                  index={choice._id}
                  text={choice.text}
                  isSelected={answerKey.includes(choice._id) ? true : false}
                />
              ))}
            </ChoiceBank>
          ) : (
            <ChoiceBank className="choice-bank">
              {question.choices.map((choice) => (
                <QuizQuestionChoice
                  key={choice._id}
                  index={choice._id}
                  text={choice.text}
                  isSelected={selectedChoices.includes(choice._id) ? true : false}
                  toggleIsSelected={selectChoice}
                />
              ))}
            </ChoiceBank>
        )}
      </QuestionBody>

      <QuestionFooter className="question-footer">
        <Message>{shouldDisplayMessage ? message : null}</Message>
        {isCorrect || remainingAttempts === 0
          ? <ActionButtonHighlighted 
              type="button" 
              onClick={handleStepQuestion}
              disabled={!allowSubmit}
            >
              Next Question
            </ActionButtonHighlighted>
          : <ActionButton
              type="button"
              onClick={submitChoices}
              disabled={!allowSubmit}
            >
              {!allowSubmit ? 'Select a Choice' : 'Submit'}
            </ActionButton>
        }
      </QuestionFooter>

    </QuestionWrapper>
  );

  /**
   * submitChoices: Submits an array of selected choices for validation
   */
  function submitChoices() {
    if (isFeedbackEnabled) {
      // allow user to see feedback message
      gradeResponse(selectedChoices);
      setShouldDisplayMessage(true);
      // setSelectedChoices([]);
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
  answerKey: PropTypes.array,
  gradeResponse: PropTypes.func,
  totalAttemptsAllowed: PropTypes.number.isRequired,
  isFeedbackEnabled: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  fetchNextQuestion: PropTypes.func.isRequired,
  remainingAttempts: PropTypes.number.isRequired,
};

Question.defaultProps = {
  answerKey: [],
  gradeResponse: null,
};

export default Question;

const QuestionWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 5em;
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
  justify-content: space-between;
  align-items: center;
`;

const ActionButton = styled(BigButton)`
  border: none;
  outline: none;

  &:hover {
    border: none;
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

const Message = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: .70em;
`;
