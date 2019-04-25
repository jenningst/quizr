import React from 'react';
// import Dashboard from './components/Dashboard';
import EditQuestion from './components/EditQuestion';
import styled from 'styled-components';
import Quiz from './components/Quiz';
import { MODES } from './constants/quizModes';
import QuestionCarousel from './components/QuestionCarousel';

const App = () => {
  return (
    <QuestionCarousel />
  );
};

export default App;
