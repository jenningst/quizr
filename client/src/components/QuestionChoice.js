import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import Button from './common/Button';
import ButtonBase from './common/base/ButtonBase';

const QuestionChoice = ({ index, choiceText, isSelected, toggleIsChoice }) => {  
  
  return (
    <>
      {isSelected ? (
        <LargeButton
          primary
          onClick={e => toggleIsChoice(index)}
        >
          {choiceText}
        </LargeButton>
        ) : (
          <LargeButton
            type="button"
            onClick={e => toggleIsChoice(index)}
          >
            {choiceText}
          </LargeButton>
        )
      }
    </>
  );  
};

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

QuestionChoice.propTypes = {
  index: PropTypes.number.isRequired,
  choiceText: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsChoice: PropTypes.func,
};

QuestionChoice.defaultProps = {
  toggleIsChoice: null,
}

export default QuestionChoice;