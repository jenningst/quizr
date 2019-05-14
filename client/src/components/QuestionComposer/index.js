import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChoiceEntry from './ChoiceEntry';

import { BigButton } from '../common/Button';

import { useMutation } from 'react-apollo-hooks';
import { CREATE_QUESTION, GET_QUESTIONS } from '../../queries/questionQueries';

const QuestionComposer = () => {
  const [title, setTitle] = useState('');
  const [choiceCache, setChoiceCache] = useState([]);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [errors, setErrors] = useState(null);
  const isInvalid = title === '' || choiceCache.length < 5 || !hasAnswer;
  
  const input = { title, choices: choiceCache };

  useEffect(() => {
    if (choiceCache.length > 0) {
      if (choiceCache.filter(c => c.isAnswer === true).length > 0) {
        setHasAnswer(true);
        return;
      }
      setHasAnswer(false);
    }
  }, [choiceCache]);

  const createQuestion = useMutation(CREATE_QUESTION, {
    update: (cache, { data: { createQuestion } }) => {
      const { questions } = cache.readQuery({ query: GET_QUESTIONS });
        cache.writeQuery({
          query: GET_QUESTIONS,
          data: { questions: questions.concat([createQuestion]) }
        });
    }
  });

  return (
    <ComposeQuestionWrapper className="question-composer-wrapper">
      <Header>
        <Title>Compose a Question</Title>
      </Header>
      <Main className="question-composer-main">
        <TextAreaWrapper>
          <TitleTextArea
            rows="2"
            cols="15"
            name="question-text"
            placeholder="Start typing your question ..."
            value={title}
            onChange={handleTitleChange}
          />
        </TextAreaWrapper>
        {title 
          ? <ChoiceEntry 
              className="choice-entry"
              choiceCache={choiceCache}
              toggleIsAnswer={toggleIsAnswer}
              addChoice={addChoice}
              updateChoice={updateChoice}
              deleteChoice={deleteChoice}
            /> 
          : null}
      </Main>
        <Footer className="question-composer-footer">
          <p>{errors}</p>
          <BigButton
            disabled={isInvalid}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              createQuestion({ variables: { input } });
              clearInputs();
            }}
          >
            Submit
          </BigButton>
        </Footer>
    </ComposeQuestionWrapper>
  );

  // Handles changes for input fields
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  // Toggles whether a choice is a valid answer
  function toggleIsAnswer(index) {
    if (index > -1) {
      let updatedCache = [ ...choiceCache ];
      updatedCache[index].isAnswer = !updatedCache[index].isAnswer;
      setChoiceCache(updatedCache);
    }
  }

  // Creates a new, blank choice template in state
  function addChoice(choiceText) {
    // setup choice choiceText
    const newChoice = { 
      text: choiceText,
      isAnswer: false,
    };
    setChoiceCache([...choiceCache, newChoice ]);
  }

  // Deletes an existing choice from state
  function deleteChoice(index) {
    if (index > -1) {
      console.log(index);
      let updatedCache = [ ...choiceCache ];
      // find object with the correct index
      let choices;
      if (index === 0) { // result was first element
        choices = updatedCache.slice(1);
      } else { // result was element other than first or last
        updatedCache.splice(index, 1);
        choices = updatedCache;
      }
      setChoiceCache(choices);
    }
  }

  // Updates an existing choice from state
  function updateChoice(index, choicePayload) {
    if (choicePayload && index > -1) {
      // copy state and update
      let updatedCache = [ ...choiceCache ];
      updatedCache[index].text = choicePayload.text;
      updatedCache[index].isAnswer = choicePayload.isAnswer;
      setChoiceCache(updatedCache);
    }
  }

  // Handles the clearing of all inputs after a submission
  function clearInputs() {
    setChoiceCache([]);
    setTitle('');
  }
};

export default QuestionComposer;

const ComposeQuestionWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3em auto 3em;
  grid-row-gap: .50em;
  grid-template-areas:
    "header"
     "main"
     "footer";
  width: auto;
  height: 100%;

  padding: 1em;

  background: #FFFFFF;
  border-radius: 8px;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  font-weight: 600;
  text-align: center;
`;

const Main = styled.section`
  grid-area: main;
`;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 950px;
  margin-bottom: .50em;
`;

const TitleTextArea = styled.textarea`
  width: 100%;
  flex-grow: 2;
  font-size: .70em;
  font-family: 'Montserrat', sans-serif;
  background: #F5F6FA;
  color: #333333;
  padding: 1em;
  border: none;
  outline: none;
  resize: none;

  &::placeholder {
    color: #c0c0c0;
  }
`;

const Footer = styled.div`
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
`;