import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Assessment from './Assessment';
import Question from './Question';

import { arraysAreEqual } from '../../utilities/helpers.js'

const Quiz = ({ mode, questionSet, resetQuiz }) => {
  const [index, setIndex] = useState(0);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(mode.ATTEMPTS);
  const [answerKey, setAnswerKey] = useState(generateAnswerKey(questionSet));

  const { ATTEMPTS, FEEDBACK, REPORT } = mode;

  return (
    <QuizWrapper className="quiz-wrapper">
      <QuizHeader>
        {index < questionSet.length
          ? <>
              <HeaderContent>
                QUESTION {index + 1} of {questionSet.length}
              </HeaderContent>
              <HeaderContent>
                {`ATTEMPTS REMAINING: ${attemptCounter}`}
              </HeaderContent>
            </>
          : <HeaderContent>QUIZ COMPLETE</HeaderContent>
        }
      </QuizHeader>

      <QuizMain>
        {index && questionSet && index === questionSet.length
          ? <Assessment
              score={correctCount}
              totalPossible={questionSet.length}
              reportType={REPORT}
              data={REPORT !== "NONE" ? answerKey: null}
              resetQuiz={resetQuiz}
            />
          : attemptCounter > 0 || isSubmissionCorrect
            ? <Question
                question={questionSet[index]}
                gradeResponse={gradeResponse}
                isFeedbackEnabled={FEEDBACK}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestionIndex}
              />
            :
              <Question
                question={questionSet[index]}
                answerKey={answerKey[questionSet[index]._id].answers}
                isFeedbackEnabled={FEEDBACK}
                totalAttemptsAllowed={ATTEMPTS}
                remainingAttempts={attemptCounter}
                isCorrect={isSubmissionCorrect}
                fetchNextQuestion={incrementQuestionIndex}
              />
        }
      </QuizMain>
    </QuizWrapper>
  );

    /**
   * generateAnswerKey: Creates an object to hold the answer key 
   * and all quiz choices. Used to grade individual questions or an entire 
   * question set.
   */
  function generateAnswerKey(questionArray) {
    let answerKey = {};
    // let maskedSet = [];

    // for each question, get id of each choice that is an answer
    for (let i = 0; i < questionArray.length; i++) {
      let answerKeyObject = {};
      // let maskedObject = { ...questionArray[index] };

      answerKeyObject.answers =
      questionArray[i].choices
          .filter(choice => choice.isAnswer === true)
          .map(answers => answers._id);

      answerKeyObject.choices = [];
      answerKeyObject.status = 'unanswered';

      // add the question's answer key
      answerKey[questionArray[i]._id] = answerKeyObject;
      // // add the question's question
      // maskedSet.push(maskedObject);
    }
    return answerKey;
  }

  /**
   * updateAnswerKey: Updates the answer key object with choices made throughout
   * the quiz.
   */
  function updateAnswerKey(id, choicePayload, status) {
    let updatedKey = { ...answerKey };
    updatedKey[id].choices = choicePayload;
    updatedKey[id].status = status;
    setAnswerKey(updatedKey);
  }

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
    const isAnswerCorrect = arraysAreEqual(
      answerKey[currentQuestionId].answers, choicePayload
    );

    if (isAnswerCorrect) {
      if (REPORT !== "NONE") { // update answer key for post-quiz assessment
        // update answer key with choices
        updateAnswerKey(currentQuestionId, choicePayload, "correct");
        // increment correct count
        setCorrectCount(correctCount + 1);
      }

      if (FEEDBACK) { // give UI feedback to user
        // set correct status to true
        setIsSubmissionCorrect(true);
      } else {
        incrementQuestionIndex();
      }
    } else { // incorrect submission
      if (attemptCounter > 0) {
        setAttemptCounter(attemptCounter - 1);
      } else {
        updateAnswerKey(currentQuestionId, choicePayload, "incorrect");
      }

      if (FEEDBACK) {
        setIsSubmissionCorrect(false);
      }
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
