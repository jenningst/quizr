import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ButtonBase from './common/base/ButtonBase';
import QuestionChoice from './QuestionChoice';

const AnswerKey = ({ answerKey, getNextQuestion }) => {
  return (
    <AnswerKeyWrapper className="answer-key-wrapper">
      <QuestionTitle className="question-title">
        {answerKey.title}
      </QuestionTitle>
      <AnswerBank className="choice-list">
        {answerKey.choices.map((choice, index) => (
          <QuestionChoice
            key={index}
            index={index}
            choiceText={choice.text}
            isSelected={choice.isAnswer}
          />
        ))}
        <ActionWrapper className="action-buttons">
          <ActionButton 
            backgroundColor="#6121bf"
            borderColor="#4717a2"
            type="button" 
            onClick={getNextQuestion}
          >
            Next Question
          </ActionButton>
        </ActionWrapper>
      </AnswerBank>
      <MessageBox className="message-box">

      </MessageBox>
    </AnswerKeyWrapper>
  );
};

AnswerKey.propTypes = {
  answerKey: PropTypes.shape({
    choices: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  getNextQuestion: PropTypes.func.isRequired,
};

export default AnswerKey;

const AnswerKeyWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AnswerBank = styled.section`
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