import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';

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

const LargeButton = styled(ButtonBase)`
  width: 90%;
  height: 4em;
  margin: 0em 1em .25em 1em;
  font-size: 1em;
  background: #FFFFFF;
  color: #8B90FF;
  border: none;
  outline: none;

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