import React from 'react';
import { MODES as COMPOSER_MODES } from '../constants/composerModes';
import QuestionComposer from './QuestionComposer';

const App = () => {
  return (
    <QuestionComposer modes={COMPOSER_MODES}/>
  );
};

export default App;
