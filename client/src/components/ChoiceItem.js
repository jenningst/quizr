import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from './common/InputField';
import Button from './common/Button';

// TODO: create some visual artifact to display the input is an answer

const ChoiceItem = ({ index, isAnswer, updateChoice, deleteChoice, toggleIsAnswer }) => {
  const [inputValue, setInputValue] = useState("");
  
  return (
    <div className="choice-group" key={index}>
      <InputField 
        type="text"
        name={`choice-${index}`}
        placeholder="Enter Choice Text..."
        value={inputValue}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
      <Button type="button" onClick={e => toggleIsAnswer(index)}>Is Answer?</Button>
      <Button type="button" onClick={e => deleteChoice(index)}>Delete</Button>
    </div>
  );

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function onBlur(e) {
    // create a payload to match state
    const inputPayload = {
      index,
      text: inputValue,
      isAnswer,
    };
    updateChoice(inputPayload);
  }
};

export default ChoiceItem;

ChoiceItem.propTypes = {
  index: PropTypes.number.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
  toggleIsAnswer: PropTypes.func.isRequired,
};
