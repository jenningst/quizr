import React, { useState, useEffect } from 'react';
import Question from './Question';
import Assessment from './Assessment';
import styled from 'styled-components';
import { SAMPLE_QUESTIONS } from '../constants/sampleQuestions';
import { MODES } from '../constants/quizModes';

const Quiz = () => {
  // state for all modes
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  // state for intensive mode
  const [mode, setMode] = useState(MODES.PREP_MODE);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(3);

  useEffect(() => {
    // pre-load questions
    setQuestions(SAMPLE_QUESTIONS);
  }, []);

  return (
    <QuizWrapper>
      <h1>Question {index + 1} of {questions.length}</h1>
      {mode.RETRIES && <h1>You have {attemptCounter} attempts left</h1>}
      {index && index === questions.length
        ? <Assessment
            score={correctCount}
            totalPossible={questions.length}
          />
        : attemptCounter > 0
            ?  <Question
                  question={SAMPLE_QUESTIONS[index]}
                  gradeResponse={gradeResponse}
                  retries={mode.RETRIES}
                  isCorrect={isSubmissionCorrect}
                  getNextQuestion={getNextQuestion}
                  remainingAttempts={attemptCounter}
              />
            : <h1>No attemps left!</h1>
      }
    </QuizWrapper>
  );

  // REFACTOR: make this async on the server
  function gradeResponse(choicePayload) {
    // Checks the validity of a choices payload from Question
    const ANSWERS = getAnswers();
    const IS_CORRECT = objectsAreEqual(ANSWERS, choicePayload);

    if (mode.REPORT === "SET") {
      if (IS_CORRECT) { 
        setIsSubmissionCorrect(true); // mark as correct
        setCorrectCount(correctCount + 1); // update correct count
        return;
      }
    } else if (mode.REPORT === "QUESTION") {
      if (IS_CORRECT) {
        setIsSubmissionCorrect(true); // mark as correct
        setCorrectCount(correctCount + 1); // update correct count
        return;
      }
      setAttemptCounter(attemptCounter - 1); // decrement attempts
    } else if (mode.REPORT === "NONE") {
      if (IS_CORRECT) {
        
      }
    }
  }

  function objectsAreEqual(a, b) {
    // Compares two arrays for equality
    if (a.length === b.length) {
      // go through each response
      if (a.every(item => b.includes(item))) {
        return true;
      }
    }
    return false;
  }

  function getAnswers() {
    // Helper method; Returns an array of correct choice indexes
    let answerIndexes = [];
    SAMPLE_QUESTIONS[index].choices.map((choice, index) => {
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
    setAttemptCounter(3); // reset attemptCounter to 3
  }
};

const QuizWrapper = styled.div`
  background: #46596C;
`;

export default Quiz;
