import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ChoiceEntry from './ChoiceEntry';
import { BigButton } from '../common/Button';

import { Mutation } from 'react-apollo';
import { CREATE_QUESTION, GET_QUESTIONS } from '../../queries/question';

const QuestionComposer = () => {
  const [title, setTitle] = useState('');
  const [choiceCache, setChoiceCache] = useState([]);
  const [choiceIncrementer, setChoiceIncrementer] = useState(0);
  const [hasAnswer, setHasAnswer] = useState(false);
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

  return (
    // <Mutation
    //   mutation={CREATE_QUESTION}
    //   update={(cache, { data: { createQuestion } }) => {
    //     const { questions } = cache.readQuery({ query: GET_QUESTIONS });
    //     cache.writeQuery({
    //       query: GET_QUESTIONS,
    //       data: { questions: questions.concat([createQuestion]) }
    //     });
    //   }}
    // >
    //   {(createQuestion) => (
        <ComposeQuestionWrapper>
          <Header>
            <Title>{JSON.stringify(choiceCache)}</Title>
          </Header>
          <Main>
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
            <Footer>
              <BigButton
                disabled={isInvalid}
                type="button"
              >
                Submit
              </BigButton>
            </Footer>
        </ComposeQuestionWrapper>
    //   )}
    // </Mutation>
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
    setChoiceIncrementer(choiceIncrementer + 1);
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

};

QuestionComposer.propTypes = {
  currentStep: PropTypes.number.isRequired,
  maxStepAllowed: PropTypes.number.isRequired,
  setMaxStep: PropTypes.func.isRequired,
}

export default QuestionComposer;

const ComposeQuestionWrapper = styled.div`
  display: grid;
  grid-template-rows: 3em auto 3em;
  grid-template-areas:
    "header"
     "main"
     "footer";
  width: auto
  height: 94vh;
  background: #f5f6fa;
  padding: 1em;
`;

const Header = styled.header`
  grid-area: header;
`;

const Title = styled.h1`
  grid-area: header;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  text-align: center;
  margin-bottom: .50em;
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