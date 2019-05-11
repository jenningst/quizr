import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BigButton } from '../common/Button';

const ModeSelection = ({ modes, setQuizMode }) => {
  const [modeIndex, setModeIndex] = useState(null);

  return (
    <>
      <Title>Select a Quiz Mode</Title>
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
      <BigButton type="button" onClick={handleModeSelect}>START QUIZ</BigButton>
    </>
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

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const ButtonGroup = styled.div`
  flex-grow: 2;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const ModeSelectionCard = styled(BigButton)`
  width: 10em;
  height: 10em;
  border: 1px solid grey;

  & + button {
    margin-left: 1em;
  }
`;