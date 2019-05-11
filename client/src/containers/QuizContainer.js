import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Query } from 'react-apollo';
import { GET_QUESTIONS } from '../queries/questionQueries';

import ModeSelection from '../components/quiz/ModeSelection';
import Quiz from '../components/quiz/Quiz';

import { MODES } from '../constants/quizModes';

/* ** DATA & RENDER LOGIC ONLY ** */

const QuizContainer = () => {
  const [mode, setMode] = useState(null);

  return (
    <QuizWrapper>
      {!mode
        ? <ModeSelection modes={MODES} setQuizMode={setQuizMode} />
        : <Query query={GET_QUESTIONS}>
            {({ loading, error, data }) => {

              // fall-back UI
              if (loading) return "Loading Questions";
              if (error) return `Error loading questions: ${error.message}`;

              // destructure our fetched questions
              const { fetchQuestions: questions } = data;

              // render quiz
              return (
                <Quiz
                  mode={mode}
                  questionSet={questions}
                  resetQuiz={resetQuiz}
                />
              );
            }}
          </Query>
      }
    </QuizWrapper>
  );

  /**
   * setQuizMode: Establishes the quiz mode for the current quiz.
   */
  function setQuizMode(index) {
    setMode(MODES[index]);
  }

  /**
   * resetQuiz: Resets a quiz.
   */
  function resetQuiz() {
    setMode(null)
  }
};

export default QuizContainer;

const QuizWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  height: 100%;
`;