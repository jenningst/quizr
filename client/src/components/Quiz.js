import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import AnswerItem from './AnswerItem';

const ERROR_MESSAGE = "Whoops! Try again!";
const SUCCESS_MESSAGE = "That's correct!";

const Quiz = () => {  
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [assistMode, setAssistMode] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <QuizWrapper>
      <h1>Quiz</h1>
      <ButtonBase type="button" onClick={toggleAssistMode}>
        {assistMode ? "Disable Assist Mode" : "Enable Assist Mode"}
      </ButtonBase>
      <div className="answer-box">
        {message}
      </div>
      <div className="question-title">
        <h2>{SAMPLE_QUESTION.title}</h2>
      </div>

      {SAMPLE_QUESTION.choices.map((choice, index) => (
        <AnswerItem
          key={index}
          index={index}
          choiceText={choice.text}
          isSelected={selectedChoices.includes(index) ? true : false}
          toggleIsChoice={selectChoice}
        />
      ))}
      <ButtonBase type="button" onClick={checkAnswer}>
        Submit Answer
      </ButtonBase>
    </QuizWrapper>
  );

  function selectChoice(index) {
    // adds/removes a choice selection and updates local state
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

  function toggleAssistMode() {
    setAssistMode(!assistMode);
  }

  function getAnswers() {
    // returns an array of correct choice indexes
    let answerIndexes = [];
    SAMPLE_QUESTION.choices.map((choice, index) => {
        if (choice.isAnswer === true) {
          answerIndexes.push(index);
        }
      });
    return answerIndexes;
  }
};

const QuizWrapper = styled.div`
  background: #f7f8fb;
`;

const AnswerListWrapper = styled.section`
  
`;

const SAMPLE_QUESTION = {
  "title":"What is 1 + 1?",
  "choices":[
    {
      // "index":0,
      "text":"1",
      "isAnswer":false
    },
    {
      // "index":1,
      "text":"2",
      "isAnswer":true
    },
    {
      // "index":2,
      "text":"4",
      "isAnswer":false
    },
    {
      // "index":3,
      "text":"8",
      "isAnswer":false
    },
    {
      // "index":4,
      "text":"16",
      "isAnswer":false
    }
  ]
};

export default Quiz;