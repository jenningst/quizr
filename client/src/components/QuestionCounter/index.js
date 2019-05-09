import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuestionCounter = ({ count }) => (
  <CounterWrapper>
    <Header>
      <Title>Questions: {count}</Title>
    </Header>
  </CounterWrapper>
);

QuestionCounter.propTypes = {
  count: PropTypes.number.isRequired,
};

export default QuestionCounter;

const CounterWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3em 1fr;
  grid-template-areas: 
    "header"
    "list";
  grid-gap: 2em;
  width: auto;
  height: 100%;

  padding: 1em;

  background: #FFFFFF;
  border-radius: 5px;
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  grid-area: header;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  text-align: center;
`;