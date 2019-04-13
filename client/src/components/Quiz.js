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
  const [mode, setMode] = useState(MODES.INTENSIVE_MODE);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // pre-load questions
    setQuestions(SAMPLE_QUESTIONS);
  }, []);

  return (
    <QuizWrapper>
      {index && index === questions.length
        ? <Assessment
          />
        : <Question
              question={SAMPLE_QUESTIONS[index]}
              getNextQuestion={getNextQuestion}
          />
      }
    </QuizWrapper>
  );

  function getNextQuestion() {
    setIndex(index + 1);
  }
};

const QuizWrapper = styled.div`
  background: #46596C;
`;

export default Quiz;