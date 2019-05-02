import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton } from '../common/Button';

const ProblemType = ({ modes, problemType, setProblemType }) => {
  return (
    <>
      <Title className="page-title">What type of problem is this?</Title>
      <FlexButtonGroup className="button-group">
        {modes.map((mode, index) => (
          <ProblemTypeCard
            key={index}
            index={index}
            name={mode.DISPLAY_NAME}
            onClick={() => setProblemType(index)}
            active={problemType === mode.DISPLAY_NAME}
          >
            {mode.DISPLAY_NAME}
          </ProblemTypeCard>
        ))}
      </FlexButtonGroup>
    </>
  );

  // // Sets the selected problem type as the selection
  // function handleClick(index) {
  //   selectProblemType(index);
  // }
};

ProblemType.propTypes = {
  modes: PropTypes.arrayOf(PropTypes.shape({
    DISPLAY_NAME: PropTypes.string.isRequired,
    ALLOW_MARKDOWN: PropTypes.bool.isRequired,
    CODE_EDITOR: PropTypes.bool.isRequired,
  })).isRequired,
  problemType: PropTypes.shape({
    DISPLAY_NAME: PropTypes.string.isRequired,
    ALLOW_MARKDOWN: PropTypes.bool.isRequired,
    CODE_EDITOR: PropTypes.bool.isRequired,
  }),
  setProblemType: PropTypes.func.isRequired,
};

export default ProblemType;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
`;

const FlexButtonGroup = styled.div`
  flex-grow: 2;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const ProblemTypeCard = styled(BigButton)`
  width: 10em;
  height: 10em;

  & + button {
    margin-left: 1em;
  }
`;