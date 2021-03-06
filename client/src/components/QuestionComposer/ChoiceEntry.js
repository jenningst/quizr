import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChoiceItem from './ChoiceItem';
import { SmallButton } from '../common/Button';

const ChoiceEntry = ({ choiceCache, toggleIsAnswer, addChoice, updateChoice, deleteChoice }) => {
  const [choiceText, setChoiceText] = useState("");

  return (
      <ChoiceComposerWrapper className="choice-entry-wrapper">
        <FormWrapper className="form-wrapper">
          <form onSubmit={addNewChoice}>
            <InputWrapper>
              <ChoiceInput 
                name="choice-text"
                value={choiceText}
                onChange={(e)=> setChoiceText(e.target.value)}
                placeholder="Start typing a choice ..."
              />
              <EmbeddedButton type="submit">Add</EmbeddedButton>
            </InputWrapper>
          </form>
        </FormWrapper>
        <ChoiceList>
          {choiceCache &&
            choiceCache.map((choice, index) => {
              const { isAnswer, text } = choice;
              return (
                <ChoiceItem
                  key={index}
                  index={index}
                  choiceText={text}
                  isAnswer={isAnswer}
                  toggleIsAnswer={toggleIsAnswer}
                  updateChoice={updateChoice}
                  deleteChoice={deleteChoice}
                />
              )
            })
          }
        </ChoiceList>
      </ChoiceComposerWrapper>
  );

  // // Handles changes for input fields
  // function handleInputChange(e) {
  //   setChoiceText(e.target.value);
  // }

  // Adds a new choice
  function addNewChoice(e) {
    addChoice(choiceText);
    setChoiceText("");
    e.preventDefault();
  }
};

ChoiceEntry.propTypes = {
  choiceCache: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    isAnswer: PropTypes.bool.isRequired,
  }).isRequired,),
  toggleIsAnswer: PropTypes.func.isRequired,
  addChoice: PropTypes.func.isRequired,
  updateChoice: PropTypes.func.isRequired,
  deleteChoice: PropTypes.func.isRequired,
};

export default ChoiceEntry;

const ChoiceComposerWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const ChoiceInput = styled.input`
  width: 100%;
  flex-grow: 2;
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  background: #F5F6FA;
  padding: .50em
  border: none;
  outline: none;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  margin-bottom: .50em;
`;

const ChoiceList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  background: #ffffff;
  padding-top: .50em;
  padding-bottom: .50em;

  & :first-child {
    margin-left: 1em;
    margin-right: 1em;
  }

  & :last-child {
    margin-right: 1em;
  }
`;

const EmbeddedButton = styled(SmallButton)`
  font-size: .70em;
  margin-right: .5em;
  background: #CCCCCF;
  color: #FFFFFF;
  outline: none;
  border: none;

  &:hover {
    background: #8B90FF;
  }
`;