import React, { useState } from 'react';
import styled from 'styled-components';

import { useQuery } from 'react-apollo-hooks';
import { GET_QUESTIONS } from '../queries/questionQueries';

import ModeSelection from '../components/Quiz/ModeSelection';
import Quiz from '../components/Quiz';

import { MODES } from '../constants/quizModes';

/* ** DATA & RENDER LOGIC ONLY ** */

const QuizContainer = () => {
  const [mode, setMode] = useState(null);
  const setQuizMode = (index) => setMode(MODES[index]);
  const resetQuizMode = () => setMode(null);

  const [correctCount, setCorrectCount] = useState(0);
  const incrementCorrectCount = () => setCorrectCount(correctCount + 1);

  // fetch GraphlQl data
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const { fetchQuestions: questions } = data;
  
  if (loading) {
    return <div>{"Loading Questions"}</div>;
  }

  if (error) {
    return <div>{`Error loading questions: ${error.message}`}</div>
  }

  return (
    <QuizContainerWrapper>
      {!mode
        ? <ModeSelection
            modes={MODES}
            setQuizMode={setQuizMode}
          />
        : <Quiz
            options={mode}
            questionSet={questions}
            correctCount={correctCount}
            incrementCorrectCount={incrementCorrectCount}
            resetQuiz={resetQuizMode}
          />
      }
    </QuizContainerWrapper>
  );
};

export default QuizContainer;

const QuizContainerWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  height: 100%;

  padding: 2em;
  background: #EFF3FB;
`;