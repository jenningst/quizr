import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import AnswerItem from './AnswerItem';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";

const Question = ({ question, submitResponses, isCorrect, getNextQuestion, attemptsLeft }) => {  
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    setSelectedChoices([]);
  }, [attemptsLeft]);

  useEffect(() => {
    setSelectedChoices([]);
  }, [isCorrect]);

  return (
    <QuestionWrapper className="question-wrapper">
      <QuestionTitle className="question-title">
        {question.title}
      </QuestionTitle>
      <AnswerList className="answer-list">
        {question.choices.map((choice, index) => (
          <AnswerItem
            key={index}
            index={index}
            choiceText={choice.text}
            isSelected={selectedChoices.includes(index) ? true : false}
            toggleIsChoice={selectChoice}
          />
        ))}
        <ActionWrapper className="action-buttons">
          {isCorrect
            ? <ActionButton 
                backgroundColor="#6121bf"
                borderColor="#4717a2"
                type="button" 
                onClick={fetchNextQuestion}
              >
                Next Question
              </ActionButton>
            : <ActionButton
                type="button" 
                onClick={sendChoicePayload}
              >
                Submit
              </ActionButton>
          }
        </ActionWrapper>
      </AnswerList>
      <MessageBox className="message-box">
        {message}
      </MessageBox>
    </QuestionWrapper>
  );

  // Submits an array of selected choices for validation
  function sendChoicePayload() {
    submitResponses(selectedChoices);
  }

  // Adds or removes a element from the selectedChoices state
  function selectChoice(index) {
    let selections = [...selectedChoices];
    if (!selections.includes(index)) {
      selections.push(index);
    } else {
      if (selections.length === 1) {
        selections = [];
      }
      selections.splice(selections.indexOf(index), 1);
    }
    setSelectedChoices(selections);
  }

  // Sets a request to Quiz for the next question
  function fetchNextQuestion() {
    setSelectedChoices([]);
    getNextQuestion();
  }
};

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    choices: PropTypes.array.isRequired,
  })).isRequired,
  getNextQuestion: PropTypes.func.isRequired,
};

export default Question;

// Styles
const QuestionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AnswerList = styled.section`
  width: 90%;
`;

const ActionWrapper = styled.div`
  height: 5em;
  width: 100%;
`;

const MessageBox = styled.section`
  height: 5em;
`;

const QuestionTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
`;

const ActionButton = styled(ButtonBase)`
  width: 100%;
  height: 4em;
  background: ${props => props.backgroundColor || "#4ACAB0"};
  border: 2px solid ${props => props.borderColor || "#1ABC9C"};
  color: ${props => props.primaryColor || "#FFFFFF"};
  font-size: 1em;
  font-weight: 700;
  outline: none;
`;