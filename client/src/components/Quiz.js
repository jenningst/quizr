import React, { useState, useEffect } from 'react';
import Question from './Question';
import AnswerKey from './AnswerKey';
import Assessment from './Assessment';
import styled from 'styled-components';
import { SAMPLE_QUESTIONS } from '../constants/sampleQuestions';

import { objectsAreEqual } from '../utilities/helpers'; 

const Quiz = ({ mode }) => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(mode.ATTEMPTS);

  // Pre-load questions
  useEffect(() => {
    function preloadQuestions() {
      setQuestions(SAMPLE_QUESTIONS);
    }
    if (mode.PRELOAD_QUESTIONS) preloadQuestions();
  }, []);

  return (
    <QuizWrapper className="quiz-wrapper">
      {index < questions.length &&
        <QuestionCounter>
          QUESTION {index + 1} of {questions.length}
        </QuestionCounter>
      }
      <h2>{mode.ATTEMPTS > 1 && `Remaining attempts: ${attemptCounter}`}</h2>

      {index && questions && index === questions.length
        ? <Assessment
            score={correctCount}
            totalPossible={questions.length}
          />
        : attemptCounter > 0
            ?  <Question
                  questionData={SAMPLE_QUESTIONS[index]}
                  gradeResponse={gradeResponse}
                  totalAttemptsAllowed={mode.ATTEMPTS}
                  isFeedbackEnabled={mode.FEEDBACK}
                  isAnswerCorrect={isSubmissionCorrect}
                  getNextQuestion={getNextQuestion}
                  remainingAttempts={attemptCounter}
              />
            : <AnswerKey
                answerKey={SAMPLE_QUESTIONS[index]}
                getNextQuestion={getNextQuestion}
              />
      }

    </QuizWrapper>
  );

  // function hydrateResponseBeforeGrade(choicePayload) {
  //   // call gradeResponse() with some other key data
  //   const MODE = mode;
  //   let response = gradeResponse(MODE, question, choicePayload);
  // }

  // function maskAnswerKey(question) {
  //   // Removes answer from a question object
  //   let cleansedQuestion = { ...question };
  //   return cleansedQuestion.choices.forEach(choice => choice.isAnswer = null);
  // }

  // REFACTOR: make this async on the server
  // Checks the validity of a choices payload from Question
  function gradeResponse(choicePayload) {
    const ANSWERS = getAnswerArray();
    const IS_CORRECT = objectsAreEqual(ANSWERS, choicePayload);

    if (IS_CORRECT) {
      if (mode.REPORT !== "NONE") setCorrectCount(correctCount + 1);
      if (mode.FEEDBACK) { 
        setIsSubmissionCorrect(true);
      } else {
        getNextQuestion();
      }
    } else {
      if (mode.ATTEMPTS) setAttemptCounter(attemptCounter - 1);
      if (mode.FEEDBACK) setIsSubmissionCorrect(false);
    }
  }

  function getAnswerArray() {
    // Helper method; Returns an array of correct choice indexes
    let answerIndexes = [];
    SAMPLE_QUESTIONS[index].choices.forEach((choice, index) => {
      if (choice.isAnswer === true) {
        answerIndexes.push(index);
      }
    });
    return answerIndexes;
  }

  function getNextQuestion() {
    // Gets the next question object
    if (index < questions.length) {
      setIndex(index + 1); // increment the index; re-render
    }
    setIsSubmissionCorrect(false); // reset correct to false and re-render
    setAttemptCounter(mode.ATTEMPTS); // reset attemptCounter
  }
};

export default Quiz;

const QuizWrapper = styled.div`
  color: #8B90FF;
`;

const QuestionCounter = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  width: 100%;
  text-align: center;
`;
