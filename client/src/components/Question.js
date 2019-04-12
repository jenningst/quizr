import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeConsumer } from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import AnswerItem from './AnswerItem';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";

const Question = ({ question, getNextQuestion }) => {  
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [assistMode, setAssistMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

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
          {renderSubmitOrNext()}
        </ActionWrapper>
      </AnswerList>
      <MessageBox className="message-box">
        {message}
      </MessageBox>
    </QuestionWrapper>
  );

  function renderSubmitOrNext() {
    // Dynamically renders a button; renders a "submit" button if at least one
    // choice has been selected and renders a "next question" button if the 
    // question has been answered correctly.
    if (selectedChoices.length > 0) {
      if (isCorrect === true) { //render next question button
        return (
          <ActionButton 
            backgroundColor="#6121bf"
            borderColor="#4717a2"
            type="button" 
            onClick={fetchQuestion}
          >
            Next Question
          </ActionButton>
        );
      } else { // render submit current question button
        return (
          <ActionButton
            type="button" 
            onClick={checkAnswer}
          >
            Submit
          </ActionButton>
        );
      }
    }
    return null;
  }

  function selectChoice(index) {
    // Adds or removes a choice selection and updates local state
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

  function checkAnswer() {
    // Checks the validity of an answer set; has two modes: (a)
    // quick check and assist mode
    let choices = selectedChoices; // choices = [3, 0]
    const ANSWERS = getAnswers(); // answers = [2]

    function onError() {
      setIsCorrect(false);
      setMessage(ERROR_MESSAGE);
      setSelectedChoices([]);
    }

    function onSuccess() {
      setIsCorrect(true);
      setMessage(SUCCESS_MESSAGE);
    }

    if (assistMode === false) { // assist mode disabled
      if (choices.length !== ANSWERS.length) {
        onError();
        return;
      } else { // same number of answers
        if (ANSWERS.every(answer => choices.includes(answer))) {
          onSuccess();
          return;
        }
        onError();
        return;
      }
    } else { // assist mode enabled; provide output the user
      //let correct, incorrect, missing;
      // loop through the answers:
      // if answers.includes(THE VALUE, NOT INDEX) === true:
      //   push the correct answer to correct
      //   remove the correct answer from choices
      // else:
      //   push the missing answer to missing
      // finally:
      //   anything left over in choices gets concatenated into incorrect
  
      // invalid cases:
      // partial incorrect (missing one or more correct)
      //    answer = [1, 2, 3]; choices = [1, 2]
      //    display incorrect to user
      //    show them correct answers [1, 2]
      //    show them incorrect answers [3]
      // partial incorrect (extraneous selection)
      //    answer = [1, 3]; choices = [1, 2, 3]
      //    show them correct answers [1, 3]
      //    show them incorrect answers [2]
      // all incorrect
      //    answer = [2, 4]; choices = [0, 1, 3]
      //    show them correct answers []
      //    show them incorrect answers [0, 1, 3]
      onError();
      return;
    }
  }

  function fetchQuestion() {
    getNextQuestion();
    // re-initialize state
    setSelectedChoices([]);
    setIsCorrect(false);
    setMessage("");
  }

  function toggleAssistMode() {
    // Toggles assist mode for the question
    setAssistMode(!assistMode);
  }

  function getAnswers() {
    // Returns an array of correct choice indexes
    let answerIndexes = [];
    question.choices.map((choice, index) => {
        if (choice.isAnswer === true) {
          answerIndexes.push(index);
        }
      });
    return answerIndexes;
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