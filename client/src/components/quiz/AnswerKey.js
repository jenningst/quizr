import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BigButton, MediumButton, SmallButton } from './common/base/ButtonBase';
import QuestionChoice from './QuestionChoice';

const MESSAGE_TEXT = 'Your answer was incorrect. Here were the correct choices.'

const AnswerKey = ({
  answerKey,
  getNextQuestion
}) => {
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
          <ActionButtonHighlighted 
            type="button" 
            onClick={getNextQuestion}
          >
            Next Question
          </ActionButtonHighlighted>
        </ActionWrapper>
      </AnswerBank>
      <MessageBox className="message-box">
        {MESSAGE_TEXT}
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
  background: #E6E7FF;
`;

const AnswerBank = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;  
  height: 5em;
  width: 100%;
`;

const MessageBox = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;  
  height: 5em;
`;

const QuestionTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 3em;
  width: 90%;
`;

const ActionButton = styled(BigButton)`
  width: 90%;
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

const ActionButtonHighlighted = styled(ActionButton)`
  background: #ffcc99;
  color: #FFFFFF;

  &:hover {
    border: none;
  }
`;