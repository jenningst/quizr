import React, { useState } from 'react';
import Question from './Question';
import Assessment from './Assessment';
import styled from 'styled-components';
import { SAMPLE_QUESTIONS } from '../../constants/sampleQuestions';
import { MODES } from '../../constants/quizModes';

import { Query } from 'react-apollo';
import { GET_QUESTIONS } from '../../queries/question';

import { objectsAreEqual } from '../../utilities/helpers';

const Quiz = () => {
  const mode = MODES.ADAPTIVE_MODE;
  
  const [index, setIndex] = useState(0);
  const [isSubmissionCorrect, setIsSubmissionCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptCounter, setAttemptCounter] = useState(mode.ATTEMPTS);
  

  return (
    <Query query={GET_QUESTIONS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        const { fetchQuestions: questions } = data;

        if (questions.length > 0) {
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
                          questionData={questions[index]}
                          gradeResponse={gradeResponse}
                          totalAttemptsAllowed={mode.ATTEMPTS}
                          isFeedbackEnabled={mode.FEEDBACK}
                          isAnswerCorrect={isSubmissionCorrect}
                          getNextQuestion={getNextQuestion}
                          remainingAttempts={attemptCounter}
                      />
                    : <Question
                        questionData={questions[index]}
                        gradeResponse={gradeResponse}
                        totalAttemptsAllowed={mode.ATTEMPTS}
                        isFeedbackEnabled={mode.FEEDBACK}
                        isAnswerCorrect={isSubmissionCorrect}
                        getNextQuestion={getNextQuestion}
                        remainingAttempts={attemptCounter}
                    />
                  }
            </QuizWrapper>
          );
        } else {
          return (
            <QuizWrapper>
              <div>No questions!</div>
            </QuizWrapper>
          )
        }
      }}
    </Query>
  )

  // // Masks the answers from an array of questions
  // function maskQuestionAnswerKey(array) {
  //   // Removes answer from a question object
  //   let maskedQuestions = [ ...array ];
  //   return maskedQuestions.choices.forEach(choice => choice.isAnswer = null);
  // }

  // REFACTOR: make this async on the server
  // Checks the validity of a choices payload from Question
  function gradeResponse(choicePayload) {
    // console.log(JSON.stringify(choicePayload, null, 4));
    const ANSWERS = getAnswerArray();
    // console.log(ANSWERS);
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
    // // Gets the next question object
    // if (index < questions.length) {
      setIndex(index + 1); // increment the index; re-render
    // }
    // setIsSubmissionCorrect(false); // reset correct to false and re-render
    // setAttemptCounter(mode.ATTEMPTS); // reset attemptCounter
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
