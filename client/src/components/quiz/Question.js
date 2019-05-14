import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BigButton } from '../common/Button';
import QuizQuestionChoice from './QuizQuestionChoice';

// Choice Reducer
const initChoices = () => ([]);
const choiceReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_CHOICE':
      if (state.includes(action.id)) {
        return state.filter(e => e !== action.id);
      }
      return [...state, action.id];
    case 'RESET_CHOICES':
      return initChoices();
    default:
      return state;
  }
};

// Message Reducer
const initMessage = () => ('');
const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";
const RAN_OUT_OF_ATTEMPTS = "You ran out of attempts. Here was the correct answer";
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY_ERROR_MESSAGE':
      return ERROR_MESSAGE;
    case 'DISPLAY_SUCCESS_MESSAGE':
      return SUCCESS_MESSAGE;
    case 'DISPLAY_NO_MORE_ATTEMPTS':
      return RAN_OUT_OF_ATTEMPTS;
    case 'RESET_MESSAGE':
      return initMessage();
    default:
      return '';
  }
}

const Question = ({ 
  question,
  totalAttemptsAllowed,
  remainingAttempts,
  gradeResponse,
  giveSubmissionFeedback,
  isCorrect,
  fetchNextQuestion,
  answerKey
}) => {
  const [selectedChoices, dispatchChoice] = useReducer(choiceReducer, []);
  const [message, dispatchMessage] = useReducer(messageReducer, '');
  const allowSubmit = selectedChoices.length > 0 || answerKey.length > 0 || isCorrect;

  const handleSelectChoice = (id) => {
    dispatchChoice({ type: 'TOGGLE_CHOICE', id });
  }

  /**
   * Handles the diplay of error messages to the user based on incorrect answer
   * submission (i.e. the remainingAttemps props decrements).
   */
  useEffect(() => {
    if (giveSubmissionFeedback) {
      if (remainingAttempts !== totalAttemptsAllowed) {
        dispatchMessage({ type: 'DISPLAY_ERROR_MESSAGE' });
      }

      if (remainingAttempts === 0) {
        dispatchMessage({ type: 'DISPLAY_NO_MORE_ATTEMPTS' });
      }
    }
    dispatchChoice({ type: 'RESET_CHOICES'});
  }, [remainingAttempts]);

  /**
   * Handles the display of success messages to the user based on a correct 
   * answer submission (i.e. the isCorrect prop changes).
   */
  useEffect(() => {
    if (giveSubmissionFeedback && isCorrect) { 
      dispatchMessage({ type: 'DISPLAY_SUCCESS_MESSAGE' });
    }
  }, [isCorrect]);

  useEffect(() => {
    if (selectedChoices.length > 0) {
      dispatchMessage({ type: 'RESET_MESSAGE'})
    }
  }, [selectedChoices]);

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
                  toggleIsSelected={handleSelectChoice}
                />
              ))}
            </ChoiceBank>
        )}
      </QuestionBody>
      <QuestionFooter className="question-footer">
        <Message>{giveSubmissionFeedback ? message : null}</Message>
        {isCorrect || remainingAttempts === 0
          ? <ActionButtonHighlighted 
              type="button" 
              onClick={getNextQuestion}
              disabled={!allowSubmit}
            >
              Next Question
            </ActionButtonHighlighted>
          : <ActionButton
              type="button"
              onClick={() => gradeResponse(selectedChoices)}
              disabled={!allowSubmit}
            >
              {!allowSubmit ? 'Select a Choice' : 'Submit'}
            </ActionButton>
        }
      </QuestionFooter>
    </QuestionWrapper>
  );

  /**
   * getNextQuestion: Fetches the next question in a set
   */
  function getNextQuestion() {
    dispatchChoice({ type: 'RESET_CHOICES'}); // clear selected choices
    dispatchMessage({ type: 'RESET_MESSAGE' }); // clear feedback
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
  giveSubmissionFeedback: PropTypes.bool.isRequired,
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
