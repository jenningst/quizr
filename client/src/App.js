import React from 'react';
// import Dashboard from './components/Dashboard';
// import EditQuestion from './components/EditQuestion';
import styled from 'styled-components';
import Quiz from './components/Quiz';
import { MODES } from './constants/quizModes';

const App = () => {
  return (
    <AppWrapper>
      <Quiz mode={MODES.PREP_MODE}/>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
`;

export default App;
