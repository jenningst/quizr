import React from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AnswerItem = ({ index, choiceText, isSelected, toggleIsChoice }) => {
  return (
    <div className="answer-group" key={index}>
      <h3>{ALPHABET[index]}. {choiceText}</h3>
      <Button
        type="button"
        onClick={e => toggleIsChoice(index)}
      >
        {isSelected ? (
          "Selected"
        ) :
        (
          "Select as Answer"
        )}
      </Button>
    </div>
  );
};

AnswerItem.propTypes = {
  index: PropTypes.number.isRequired,
  choiceText: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleIsChoice: PropTypes.func.isRequired,
};

export default AnswerItem;