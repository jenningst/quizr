import React from 'react';
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
`;

  /* 
  Light Sea Green: #1ABC9C
  Eucalyptus:      #4ACAB0
  Black:           #000000
  Charcoal:        #34495E
  Payne's Grey     #5D67E
  Blue Grey        #627284
  */

export default App;
