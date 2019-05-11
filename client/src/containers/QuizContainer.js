import React from 'react';
import styled from 'styled-components';

import { Query } from 'react-apollo';
import { GET_QUESTIONS } from '../queries/questionQueries';

import Quiz from '../components/quiz/Quiz';

import { MODES } from '../constants/quizModes';

/* ** DATA & RENDER LOGIC ONLY ** */

const QuizContainer = () => {
  return (
    <QuizWrapper>
      <Query query={GET_QUESTIONS}>
        {({ loading, error, data }) => {

          // fall-back UI
          if (loading) return "Loading Questions";
          if (error) return `Error loading questions: ${error.message}`;

          // destructure our fetched questions
          const { fetchQuestions: questions } = data;

          // render quiz
          return (
            <Quiz
              mode={MODES.LEARNING_MODE}
              questionSet={questions}
              answerKey={generateAnswerKeyFromQuestions(questions)}
            />
          );
        }}
      </Query>
    </QuizWrapper>
  );
  
  /**
   * generateAnswerKeyFromQuestions: Creates an object to hold the answer key 
   * and all quiz choices. Used to grade individual questions or an entire 
   * question set.
   */
  function generateAnswerKeyFromQuestions(questionArray) {
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
    return answerKey
  }

  /**
   * maskQuestionSet(questionArray)
   */
  function maskQuestionSet(questionArray) {
    let cleansedQuestionSet = [];
    // for each question, scrub the choice.isAnswer property
    // loop through each question
    // 
  }
};

export default QuizContainer;

const QuizWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  height: 100%;
`;