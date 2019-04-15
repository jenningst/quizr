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
  width: 90%;
  height: 4em;
  margin: 0em 1em .25em 1em;
  background: ${props => props.primary ? "#8B90FF" : "#FFFFFF"};
  color: ${props => props.primary ? "#F2F2F2" : "#8B90FF"};
  font-size: 1em;
  font-weight: ${props => props.primary ? "700" : "400"};
  border: 1px solid #FFFFFF;
  outline: none;

  &:hover {
    border: 3px solid #B3B6FF;
  }
`;