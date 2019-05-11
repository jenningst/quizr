import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BigButton } from '../common/Button';

const ModeSelection = ({ modes, setQuizMode }) => {
  const [modeIndex, setModeIndex] = useState(null);

  return (
    <ModeSelectionWrapper>
      <Title>Select a Quiz Mode</Title>
      <Main>
        <ButtonGroup>
          {modes.map((mode, index) => (
            <ModeSelectionCard
              key={index}
              index={index}
              onClick={() => toggleChoice(index)}
              active={index === modeIndex}
            >
              {mode.DISPLAY_NAME}
            </ModeSelectionCard>
          ))}
        </ButtonGroup>
      </Main>
      <Footer>
        <StartButton type="button" onClick={handleModeSelect}>START QUIZ</StartButton>
      </Footer>
    </ModeSelectionWrapper>
  );

  /** 
   * handleModeSelect: Submits a mode for the quiz
   */
  function handleModeSelect() {
    setQuizMode(modeIndex);
  }

  /**
   * toggleChoice: Sets the modeIndex state
   */
  function toggleChoice(index) {
    setModeIndex(index);
  }
};

ModeSelection.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.shape({
    ATTEMPTS: PropTypes.number.isRequired,
    FEEDBACK: PropTypes.bool.isRequired,
    REPORT: PropTypes.string.isRequired,
    TIMER: PropTypes.string.isRequired,
    PRELOAD_QUESTIONS: PropTypes.bool.isRequired,
    DISPLAY_NAME: PropTypes.string.isRequired
  })).isRequired,
  setQuizMode: PropTypes.func.isRequired,
};

export default ModeSelection;

const ModeSelectionWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3em auto 3em;
  grid-row-gap: .50em;
  grid-template-areas:
    "header"
     "main"
     "footer";
  width: auto;
  height: 100%;

  padding: 1em;

  background: #FFFFFF;
  border-radius: 8px;
`;

const Title = styled.h1`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  font-weight: 600;
  text-align: center;
  margin: 0;

  background: #FFFFFF;
`;

const Main = styled.section`
  grid-area: main;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
  
  const ButtonGroup = styled.div`
  flex-grow: 2;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  
  @media (max-width: 685px) {
    flex-flow: column nowrap;
    justify-content: space-evenly;
  }
  `;

const ModeSelectionCard = styled(BigButton)`
  width: 10em;
  height: 10em;
  border: 1px solid grey;

  & + button {
    margin-left: 2em;
  }

  @media (max-width: 685px) {
    width: 75%;
    height: 5em;
    & + button {
      margin: 0;
    }
  }
`;

const StartButton = styled(BigButton)`
  color: #FFFFFF;
  background: #6356FF;
  border-radius: 5px;
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
`;