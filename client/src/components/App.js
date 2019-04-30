import React from 'react';
import { MODES as COMPOSER_MODES } from '../constants/composerModes';
import QuestionComposer from './QuestionComposer';
import ChoiceItem_Updated from './ChoiceItem';
import styled from 'styled-components';
import OptionsCard from './OptionsCard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  return (
    <AppWrapper>
      <QuestionComposer modes={COMPOSER_MODES}/>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
`;
