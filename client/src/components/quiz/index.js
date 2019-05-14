import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Assessment from '../Assessment';
import Question from './Question';

import { arraysAreEqual } from '../../utilities/helpers.js';

const answerKeyReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CORRECT_CHOICE':
      return state.map(answer => {
        if (answer.id === action.data.id) {
          return {
            ...answer,
            choices: action.data.choices,
            status: 'CORRECT'
          };
        } else {
          return answer;
        }
      });
    case 'ADD_INCORRECT_CHOICE':
      return state.map(answer => {
        if (answer.id === action.data.id) {
          return {
            ...answer,
            choices: action.data.choices,
            status: 'INCORRECT'
          };
        } else {
          return answer;
        }
      });
    case 'INITIALIZE':
      return action.data;
    default:
      return state;
  }
}

const Quiz = ({
  options,
  questionSet,
  resetQuizMode,
  correctCount,
  incrementCorrectCount
}) => {

  const {
    ATTEMPTS,
    FEEDBACK: FEEDBACK_ON_SUBMIT,
    REPORT: REPORT_AFTER_QUIZ
  } = options;
  const [quizLength, setQuizLength] = useState(0);
  const [index, setIndex] = useState(0);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [attemptCounter, setAttemptCounter] = useState(ATTEMPTS);
  const [answerKey, dispatchAnswerKey] = useReducer(answerKeyReducer, []);
  
  const initializeAnswerKey = (data) => { 
    dispatchAnswerKey({ type: 'INITIALIZE', data })
  };
  
  const addChoicesCorrect = (data) => {
    dispatchAnswerKey({ type: 'ADD_CORRECT_CHOICE', data })
  };
  
  const addChoicesIncorrect = (data) => {
    dispatchAnswerKey({ type: 'ADD_INCORRECT_CHOICE', data })
  };

  const initializeQuizLength = (length) => setQuizLength(length);
  const incrementQuestionIndex = () => setIndex(index + 1);
  const markSubmissionCorrect = () => setIsSubmissionCorrect(true);
  const resetIsSubmissionCorrect = () => setIsSubmissionCorrect(false);
  const decrementAttempts = () => setAttemptCounter(attemptCounter - 1);
  const resetAttempts = () => setAttemptCounter(ATTEMPTS);

  /** Initializes the quiz length and the answer key on first render. */
  useEffect(() => {
    initializeQuizLength(questionSet.length);
    initializeAnswerKey(generateAnswerKey(questionSet));
  }, []);

  return (
    <QuizWrapper className="quiz-wrapper">
      <QuizHeader>
        {index < quizLength
          ? <>
              <HeaderContent>
                QUESTION {index + 1} of {quizLength}
              </HeaderContent>
              <HeaderContent>
                {`ATTEMPTS REMAINING: ${attemptCounter}`}
              </HeaderContent>
            </>
          : <HeaderContent>QUIZ COMPLETE</HeaderContent>
        }
      </QuizHeader>

      <QuizMain>
        {index > 0 && index === quizLength
          ? <Assessment
              score={correctCount}
              total={quizLength}
              reportType={REPORT_AFTER_QUIZ}
              data={REPORT_AFTER_QUIZ !== "NONE" ? answerKey: null}
              resetQuiz={resetQuizMode}
            />
          : attemptCounter > 0 || isSubmissionCorrect
            ? <Question
                question={questionSet[index]}
                gradeResponse={gradeResponse}
                giveSubmissionFeedback={FEEDBACK_ON_SUBMIT}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestion}
              />
            :
              <Question
                question={questionSet[index]}
                answerKey={answerKey.filter(answer => answer.id === questionSet[index]._id)[0].answers}
                giveSubmissionFeedback={FEEDBACK_ON_SUBMIT}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestion}
              />
        }
      </QuizMain>
    </QuizWrapper>
  );

    /**
   * Creates an object to hold the answer key and all quiz choices. Used to 
   * grade individual questions or an entire question set.
   */
  function generateAnswerKey(questionArray) {
    let answerKey = [];
    for (let i = 0; i < questionArray.length; i++) {
      let answerKeyObject = {};
      answerKeyObject.id = questionArray[i]._id;
      answerKeyObject.answers =
      questionArray[i].choices
          .filter(choice => choice.isAnswer === true)
          .map(answers => answers._id);

      answerKeyObject.choices = [];
      answerKeyObject.status = 'UNANSWERED';
      answerKey.push(answerKeyObject);
      // answerKey[questionArray[i]._id] = answerKeyObject;
    }
    return answerKey;
  }

  /**
   * Increments the question index to retrieve the next question in a set.
   */
  function incrementQuestion() {
    // prevent incrementer from going over the quiz length
    if (index < quizLength) { 
      incrementQuestionIndex();
    }
    // reset our state for the next question
    resetIsSubmissionCorrect();
    resetAttempts();
  }

  /**
   * Grades a question submission by comparing the answers (Array) from the 
   * answerKey state and the choices (Array) returned by the Question component.
   */
  function gradeResponse(choicesArray) {
    const QUESTION_ID = questionSet[index]._id;
    const ANSWER_ARRAY = answerKey.filter(answer => answer.id === QUESTION_ID)[0].answers;
    const IS_ANSWER_CORRECT = arraysAreEqual(ANSWER_ARRAY, choicesArray);

    // create dispatch payload
    let data = { id: QUESTION_ID, choices: choicesArray };

    if (IS_ANSWER_CORRECT) {
      if (REPORT_AFTER_QUIZ !== "NONE") { 
        // add choices to answer key for post-quiz assessment
        addChoicesCorrect(data);
      }
      if (FEEDBACK_ON_SUBMIT) {
        // give UI feedback to user on question submission
        markSubmissionCorrect();
      }
      // increment correct count and move to next question
      incrementCorrectCount();
    } else {
      if (attemptCounter > 0) {
        decrementAttempts();
      } else {
        if (FEEDBACK_ON_SUBMIT) {
          resetIsSubmissionCorrect();
        }
        // add choices to answer key for post-quiz assessment
        addChoicesIncorrect(data);
      }
    }
  }
};

Quiz.propTypes = {
  options: PropTypes.shape({
    ATTEMPTS: PropTypes.number.isRequired,
    FEEDBACK: PropTypes.bool.isRequired,
    REPORT: PropTypes.string.isRequired,
    TIMER: PropTypes.string.isRequired,
    PRELOAD_QUESTIONS: PropTypes.bool.isRequired,
  }).isRequired,
  questionSet: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.array.isRequired,
    })
  ),
}

export default Quiz;

const QuizWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3em 1fr;
  grid-template-areas:
    "header"
    "main";
  grid-row-gap: .50em;

  padding: 1em;
  background: #edeff7;
  border-radius: 5px;
`;


const QuizHeader = styled.header`
  box-sizing: border-box;
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  padding-left: 1em;
  padding-right: 1em;
  background: #FFFFFF;
`;

const HeaderContent = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: .90em;
`;

const QuizMain = styled.section`
  box-sizing: border-box;
  grid-area: main;
`;
