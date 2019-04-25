import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton } from './common/base/ButtonBase';

const ProblemType = ({ currentType, problemTypes, toggleSelect, }) => {
  return (
    <>
      <Title>What type of problem is this?</Title>
      <FlexButtonGroup className="button-group">
        {problemTypes.map((type, index) => (
          <ProblemTypeCard
            key={index}
            name={type}
            onClick={toggleSelect}
            active={currentType === type}
          >
            {type}
          </ProblemTypeCard>
        ))}
      </FlexButtonGroup>
    </>
  );
};

ProblemType.propTypes = {
  currentType: PropTypes.string.isRequired,
  problemTypes: PropTypes.arrayOf(PropTypes.string),
  toggleSelect: PropTypes.func.isRequired,
};

export default ProblemType;

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
`;

const FlexButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;

const ProblemTypeCard = styled(BigButton)`
  width: 10em;
  height: 10em;

  & + button {
    margin-left: 1em;
  }
`;