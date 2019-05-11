import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from '../common/Button';

const QuizChoiceItem = ({ index, text, isSelected, toggleIsSelected }) => (
  <>
    {isSelected ? (
      <ActiveButton
        primary
        onClick={() => toggleIsSelected(index)}
      >
        {text}
      </ActiveButton>
      ) : (
        <InactiveButton
          type="button"
          onClick={() => toggleIsSelected(index)}
        >
          {text}
        </InactiveButton>
      )
    }
  </>
);

QuizChoiceItem.propTypes = {
  index: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsSelected: PropTypes.func,
};

QuizChoiceItem.defaultProps = {
  toggleIsSelected: null,
}

export default QuizChoiceItem;

const InactiveButton = styled(SmallButton)`
  width: 100%;
  padding: 1em;
  outline: none;
  text-align: left;

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