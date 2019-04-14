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
  const [message, setMessage] = useState("");
  // state for intensive mode
  const [mode, setMode] = useState(MODES.INTENSIVE_MODE);
  const [correct, setCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(3);

  useEffect(() => {
    // pre-load questions
    setQuestions(SAMPLE_QUESTIONS);
  }, []);

  return (
    <QuizWrapper>
      <h1>You have {attemptCounter} attempts left</h1>
      {index && index === questions.length
        ? <Assessment
          />
        : attemptCounter > 0
            ?  <Question
                  question={SAMPLE_QUESTIONS[index]}
                  getNextQuestion={getNextQuestion}
                  isCorrect={correct}
                  submitResponses={checkAnswer}
                  attemptsLeft={attemptCounter}
              />
            : <h1>No attemps left!</h1>
      }
    </QuizWrapper>
  );

  function checkAnswer(choicePayload) {
    // Checks the validity of a choices payload from Question
  
    // setup choices and answers for comparison
    const CHOICES = choicePayload;
    const ANSWERS = getAnswers();

    const onError = () => {
      // reduce attempts and re-render
      setAttemptCounter(attemptCounter - 1);
    }

    const onSuccess = () => {
      // update correct to true and re-render
      setCorrect(true);
    }
    
    if (CHOICES.length !== ANSWERS.length) { // check for length equality
      onError();
      return;
    } else { // same number of answers
      if (ANSWERS.every(answer => CHOICES.includes(answer))) {
        onSuccess();
        return;
      }
      onError();
      return;
    }    
    //let correct, incorrect, missing;
    // loop through the answers:
    // if answers.includes(THE VALUE, NOT INDEX) === true:
    //   push the correct answer to correct
    //   remove the correct answer from choices
    // else:
    //   push the missing answer to missing
    // finally:
    //   anything left over in choices gets concatenated into incorrect

    // invalid cases:
    // partial incorrect (missing one or more correct)
    //    answer = [1, 2, 3]; choices = [1, 2]
    //    display incorrect to user
    //    show them correct answers [1, 2]
    //    show them incorrect answers [3]
    // partial incorrect (extraneous selection)
    //    answer = [1, 3]; choices = [1, 2, 3]
    //    show them correct answers [1, 3]
    //    show them incorrect answers [2]
    // all incorrect
    //    answer = [2, 4]; choices = [0, 1, 3]
    //    show them correct answers []
    //    show them incorrect answers [0, 1, 3]
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
    // increment the index to get the next question and re-render
    setIndex(index + 1);
    // reset correct to false and re-render
    setCorrect(false);
    // reset attemptCounter to 3
    setAttemptCounter(3);
  }
};

const QuizWrapper = styled.div`
  background: #46596C;
`;

export default Quiz;

// function fetchQuestion() {
//   getNextQuestion();
//   // re-initialize state
//   setSelectedChoices([]);
//   // setIsCorrect(false);
//   setMessage("");
// }