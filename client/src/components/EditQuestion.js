import React, { useState, useEffect } from 'react';
import { reducer, addQuestionChoice } from '../reducers/reducer';
import Form from './common/Form';
import InputField from './common/InputField';
import Button from './common/Button';
import ChoiceItem from './ChoiceItem';

const MINIMUM_CHOICES = "Question must have at least 4 choice options.";
const MINIMUM_ANSWERS = "Question must have at least 1 answer.";
const BLANK_TEMPLATE = "Question template cannot be blank.";

const EditQuestion = () => {
  const [choiceCache, setChoiceCache] = useState([]);
  const [choiceIncrementer, setChoiceIncrementer] = useState(0);
  const [title, setTitle] = useState("");
  const [errorList, setErrorList] = useState([]);

  return (
    <div>
      <h1>Create a New Question</h1>
      <Form className="compose-question" onSubmit={handleFormSubmit}>
        <InputField 
          type="text"
          name="question-title"
          placeholder="Type your question here..."
          value={title}
          onChange={handleNameChange}
        >
          Problem Statement
        </InputField>
        <Button
          type="button"
          onClick={addChoiceInput}
        >
          Add Answer
        </Button>
        <div>
          <ul>
          {errorList.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
          </ul>
        </div>
        {choiceCache &&
          choiceCache.map(choice => {
            const { index, isAnswer } = choice;
            return (
              <ChoiceItem
                key={index}
                index={index}
                isAnswer={isAnswer}
                toggleIsAnswer={toggleIsAnswer}
                updateChoice={updateChoiceInput}
                deleteChoice={deleteChoiceInput}
              />
            )
          })
        }
        <Button type="submit" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Form>
    </div>
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
    setTitle(e.target.value);
  } 
  
  function addChoiceInput() {
    // setup choice payload
    const newChoice = { 
      index: choiceIncrementer,
      text: "",
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

