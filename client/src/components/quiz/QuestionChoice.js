import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton, MediumButton, SmallButton } from '../common/Button';

const QuestionChoice = ({
  index,
  choiceText,
  isSelected,
  toggleIsSelected
}) => {
  
  return (
    <>
      {isSelected ? (
        <HighlightedButton
          primary
          onClick={e => toggleIsSelected(index)}
        >
          {choiceText}
        </HighlightedButton>
        ) : (
          <LargeButton
            type="button"
            onClick={e => toggleIsSelected(index)}
          >
            {choiceText}
          </LargeButton>
        )
      }
    </>
  );
};

QuestionChoice.propTypes = {
  index: PropTypes.number.isRequired,
  choiceText: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsSelected: PropTypes.func,
};

QuestionChoice.defaultProps = {
  toggleIsSelected: null,
}

export default QuestionChoice;

const LargeButton = styled(BigButton)`
  &:hover {
    border: 3px solid #8B90FF;
    font-weight: 700;
  }
`;

const HighlightedButton = styled(LargeButton)`
  background: #8B90FF;
  font-weight: 700;
  color: #FFFFFF;

  &:hover {
    border: none;
  }
`;