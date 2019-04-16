import React, { useState, useEffect } from 'react';
// import { reducer, addQuestionChoice } from '../reducers/reducer';
import Form from './common/Form';
import ButtonBase from './common/base/ButtonBase';
import ChoiceItemImproved from './ChoiceItemImproved';
import styled from 'styled-components';

const MINIMUM_CHOICES = "Question must have at least 4 choice options.";
const MINIMUM_ANSWERS = "Question must have at least 1 answer.";
const BLANK_TEMPLATE = "Question template cannot be blank.";

const EditQuestion = () => {
  const [choiceCache, setChoiceCache] = useState([]);
  const [choiceIncrementer, setChoiceIncrementer] = useState(0);
  const [title, setTitle] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [choiceText, setChoiceText] = useState("");
  const [allowSubmit, setAllowSubmit] = useState(false);
  
  checkAllowSubmit(choiceCache);

  return (
    <ComposeQuestionWrapper className="compose-question-wrapper">
      <ComposeQuestionTitle>Compose a New Question</ComposeQuestionTitle>
      <Form className="compose-question-form">
        <Title className="form-title">PROBLEM STATEMENT</Title>
        <InputWrapper>
          <ProblemStatementInput 
            size="50"
            type="text"
            name="question-title"
            placeholder="Type your question here..."
            value={title}
            onChange={handleNameChange}
          />
        </InputWrapper>
        <Title className="form-title">CHOICE BANK</Title>
        <EmbeddedSubmitInputWrapper className="embedded-submit-input">
          <ChoiceInput 
            type="text"
            name="choice-text"
            value={choiceText}
            onChange={handleNameChange}
            placeholder="Type a valid choice..."
          />
          <EmbeddedButton type="button" onClick={addChoiceInput}>
            {"CREATE CHOICE"}
          </EmbeddedButton>
        </EmbeddedSubmitInputWrapper>
        <ChoiceBank className="choice-bank">
          {choiceCache &&
            choiceCache.map(choice => {
              const { index, isAnswer, text } = choice;
              return (
                <ChoiceItemImproved
                  key={index}
                  index={index}
                  choiceText={text}
                  isAnswer={isAnswer}
                  toggleIsAnswer={toggleIsAnswer}
                  updateChoice={updateChoiceInput}
                  deleteChoice={deleteChoiceInput}
                />
              )
            })
          }
        </ChoiceBank>
        {allowSubmit
          ? <ActionButton type="submit" onClick={handleFormSubmit}>
              Submit
            </ActionButton>
          : <ActionButtonDisabled disabled>
              Create Choices
            </ActionButtonDisabled>
        }
      </Form>
    </ComposeQuestionWrapper>
  );

  function toggleIsAnswer(index) {
    let updatedCache = [ ...choiceCache ];
    // find object with the correct index
    const result = updatedCache.findIndex(choice => choice.index === index);
    if (result !== -1) {
      // toggle isAnswer property
      updatedCache[result].isAnswer = !updatedCache[result].isAnswer;
      setChoiceCache(updatedCache);
    }
  }
  
  function handleFormSubmit(e) {
    e.preventDefault();
    
    let resultingErrors = [];
    // REFACTOR: Could abstract away error appending logic
    if (choiceCache) { 
      if (choiceCache.length < 4) { // invalid number of choices
        if (!resultingErrors.includes(MINIMUM_CHOICES)) { // add error
          resultingErrors.push(MINIMUM_CHOICES);
        }
      } else { // valid number of choices
        if (resultingErrors.includes(MINIMUM_CHOICES)) { // clean up error
          resultingErrors = [
            resultingErrors.splice(resultingErrors.indexOf(MINIMUM_CHOICES), 1)
          ];
        }
      }

      if (choiceCache.filter(obj => obj.isAnswer === true).length < 1) { // no answers
        if(!resultingErrors.includes(MINIMUM_ANSWERS)) {
          resultingErrors.push(MINIMUM_ANSWERS);
        }
      }
      else { // answer exists
        if (resultingErrors.includes(MINIMUM_ANSWERS)) { // clean up error
          resultingErrors = [
            resultingErrors.splice(resultingErrors.indexOf(MINIMUM_ANSWERS), 1)
          ];
        }
      }
    
    if (resultingErrors.length === 0) {
      // TODO: submit payload
      const questionPayload = {
        title,
        choices: [ ...choiceCache ],
      };
      console.log(questionPayload);
    }

    } else {
      resultingErrors.push(BLANK_TEMPLATE);
    }

    setErrorList(resultingErrors);
  }
  
  function handleNameChange(e) {
    switch(e.target.name) {
      case "question-title":
        setTitle(e.target.value);
        return;
      case "choice-text":
        setChoiceText(e.target.value);
        return;
      default:
        return;
    }
  }

  function checkAllowSubmit(choiceCache) {
    console.log('checking if allow submit');
    let validAnswers = [];

    useEffect(() => {
      validAnswers = choiceCache.filter(choice => choice.isAnswer === true);
      if (validAnswers.length > 0) {
        setAllowSubmit(true);
      } else {
        setAllowSubmit(false);
      }
    }, [choiceCache])
  }
  
  // Creates a new, blank choice template in state
  function addChoiceInput() {
    // setup choice payload
    const newChoice = { 
      index: choiceIncrementer,
      text: choiceText,
      isAnswer: false,
    };
    setChoiceCache([...choiceCache, newChoice ]);
    setChoiceIncrementer(choiceIncrementer + 1);
  }
  
  function deleteChoiceInput(index) {
    let updatedCache = [ ...choiceCache ];
    // find object with the correct index
    const result = updatedCache.findIndex(choice => choice.index === index);
    if (result !== -1) {
      let choices;
      if (result === 0) { // result was first element
        choices = updatedCache.slice(1);
      } else if (result === updatedCache.length - 1) { // result is last element
        choices = updatedCache.slice(0, -1);
      } else { // result was element other than first or last
        choices = [
          ...updatedCache.slice(0, result),
          ...updatedCache.slice(result + 1)];
      }
      setChoiceCache(choices);
    }
  }

  function updateChoiceInput(choicePayload) {
    if (choicePayload && choicePayload.index > -1) {
      let updatedCache = [ ...choiceCache ];
      const result = updatedCache.findIndex(c => c.index === choicePayload.index);
      if (result !== -1) {
        // update state properties for the input in state
        updatedCache[result].text = choicePayload.text;
        updatedCache[result].isAnswer = choicePayload.isAnswer;
        // update state
        setChoiceCache(updatedCache);
      }
    }
    // TODO: handle errorList gracefully
  }
};

export default EditQuestion;

const ComposeQuestionWrapper = styled.div`
  color: #8B90FF;
  height: 100vh;
  background: #E6E7FF;
  padding: 1em;
`;

const ComposeQuestionTitle = styled.h1`
  margin-top: 1em;
  margin-bottom: 1em;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 2em;
  width: 100%;
`;

const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  width: 100%;
  text-align: center;
`;

const ChoiceBank = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div {
    margin-top: .25em;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1em;
`;

const ProblemStatementInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  background: #FFFFFF;
  color: #8B90FF;
  font-family: Roboto;
  font-size: 1em;
  padding: 1em;
  border: none;
  border-bottom: 3px solid #8B90FF;
  outline: none;

  &::placeholder {
    color: #CCCCCF;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
  }
`;

const EmbeddedSubmitInputWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  background: #FFFFFF;
`;

const ChoiceInput = styled.input`
  flex-grow: 2;  
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  font-weight: 400;
  padding: 1em;
  outline: none;
  border: none;
  
  &::placeholder {
    color: #CCCCCF;
    font-size: 1em;
  }
`;

const ActionButton = styled(ButtonBase)`
  width: 100%;
  height: 4em;
  margin-top: 1em;
  font-size: 1em;
  font-weight: 700;
  background: #FFFFFF;
  color: #FFB3B3;
  border: none;
  outline: none;

  &:hover {
    border: 2px solid #FFE6E6;
  }
`;

const EmbeddedButton = styled(ButtonBase)`
  text-align: center;
  vertical-align: center;
  font-size: .75em;
  font-weight: 700;
  padding: 1em;
  margin-right: .5em;
  background: #CCCCCF;
  color: #FFFFFF;
  outline: none;
  border: none;

  &:hover {
    background: #8B90FF;
  }
`;

const ActionButtonDisabled = styled(ActionButton)`
  color: #FFE6E6;

  &:hover {
    border: none;
  }
`;