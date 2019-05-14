import React, { useState, useReducer } from 'react';

const initialState = {
  mode,
  questionIndex,
  remainingAttempts,
  isSubmissionCorrect,
  correctCount,
  selectedChoices
};

const QuizContext = React.createContext(initialState);

function QuizProvider(props) {
  return <QuizContext.Provider value={value} {...props} />;
}
export { QuizProvider };