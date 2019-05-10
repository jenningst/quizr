import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from '../common/Button';

const QuestionChoice = ({
  index,
  text,
  isSelected,
  toggleIsSelected
}) => {
  
  return (
    <>
      {isSelected ? (
        <ActiveButton
          primary
          onClick={e => toggleIsSelected(index)}
        >
          {text}
        </ActiveButton>
        ) : (
          <InactiveButton
            type="button"
            onClick={e => toggleIsSelected(index)}
          >
            {text}
          </InactiveButton>
        )
      }
    </>
  );
};

QuestionChoice.propTypes = {
  index: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsSelected: PropTypes.func,
};

QuestionChoice.defaultProps = {
  toggleIsSelected: null,
}

export default QuestionChoice;

const InactiveButton = styled(SmallButton)`
  width: 100%;
  padding: 1em;
  outline: none;

  & + button {
    margin-top: .50em;
  }

  &:hover {
    background: #8B90FF;
    color: #FCFCFC;
    font-weight: 700;
  }
`;

const ActiveButton = styled(InactiveButton)`
  background: #8B90FF;
  font-weight: 700;
  color: #FFFFFF;
  outline: none;

  &:hover {
    border: none;
  }
`;