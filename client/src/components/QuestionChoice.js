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
        <LargeButton
          primary
          onClick={e => toggleIsSelected(index)}
        >
          {choiceText}
        </LargeButton>
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
  width: 100%;
  height: 4em;
  margin-bottom: .25em;
  background: none;
  border: ${props => props.primary ? "2px solid #4ACAB0" : "2px solid #627284"};
  color: ${props => props.primary ? "#4ACAB0" : "#fff"};
  font-size: 1em;
  font-weight: ${props => props.primary ? "700" : "400"};
  outline: none;
`;