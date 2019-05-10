import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Assessment from './Assessment';
import Question from './Question';

import { arraysAreEqual } from '../../utilities/helpers.js'

const Quiz = ({ mode, questionSet, answerKey }) => {
  const [index, setIndex] = useState(0);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(mode.ATTEMPTS);

  const { ATTEMPTS, FEEDBACK, REPORT } = mode;

  return (
    <QuizWrapper className="quiz-wrapper">
      <QuizHeader>
        <HeaderContent>QUESTION {index + 1} of {questionSet.length}</HeaderContent>
        <HeaderContent>{ATTEMPTS > 1 && `ATTEMPTS REMAINING: ${attemptCounter}`}</HeaderContent>
      </QuizHeader>

      <QuizMain>
        {index && questionSet && index === questionSet.length
          ? <Assessment
              score={correctCount}
              totalPossible={questionSet.length}
            />
          : attemptCounter > 0
            ? <Question
                question={questionSet[index]}
                gradeResponse={gradeResponse}
                isFeedbackEnabled={FEEDBACK}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isAnswerCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestionIndex}
              />
            : <Question
                question={questionSet[index]}
                gradeResponse={gradeResponse}
                isFeedbackEnabled={FEEDBACK}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isAnswerCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestionIndex}
            />
        }
      </QuizMain>

    </QuizWrapper>
  );

  /**
   * Increments the question index to retrieve the next question in a set.
   */
  function incrementQuestionIndex() {
    if (index < questionSet.length) { // make sure we don't "over-increment"
      setIndex(index + 1);
    }
    setIsSubmissionCorrect(false); // reset correct to false
    setAttemptCounter(ATTEMPTS); // reset number of attempts
  }

  /**
   * Grades a question submission.
   */
  function gradeResponse(choicePayload) {
    const currentQuestionId = questionSet[index]._id;
    const IS_SUBMISSION_CORRECT = arraysAreEqual(
      answerKey[currentQuestionId].answers, choicePayload
    );

    if (IS_SUBMISSION_CORRECT) {
      if (REPORT !== "NONE") { // no end-of-quiz report generated
        setCorrectCount(correctCount + 1);
      }
      if (FEEDBACK) { // immediate feedback is needed
        setIsSubmissionCorrect(true);
      } else {
        incrementQuestionIndex();
      }
    } else { // incorrect submission
      if (ATTEMPTS) setAttemptCounter(attemptCounter - 1);
      if (FEEDBACK) setIsSubmissionCorrect(false);
    }
  }
};

Quiz.propTypes = {
  mode: PropTypes.shape({
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
