import React, { Component } from 'react';
// import Dashboard from './components/Dashboard';
// import EditQuestion from './components/EditQuestion';
import styled from 'styled-components';
import Quiz from './components/Quiz';

const App = () => {
  return (
    <AppWrapper>
      <Quiz />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  color: white;
`;

export default App;
