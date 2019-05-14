import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuestionCounter = ({ data }) => {
  return (
    <CounterWrapper>
      <Header>
        <Title>Questions: {data.length}</Title>
      </Header>
      <QuestionList>
        {data.map((q) => (
          <QuestionItem key={q._id}>{q.title.slice(0, 50)}</QuestionItem>
        ))}
      </QuestionList>
    </CounterWrapper>
  );
}

QuestionCounter.propTypes = {
  // data: PropTypes.object(),
};

export default QuestionCounter;

const CounterWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 3em 1fr;
  grid-template-areas: 
    "header"
    "list";
  grid-gap: .50em;
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

const QuestionList = styled.section`
  grid-area: list;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

const QuestionItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: .70em;

  padding: 1em;
  background: red;
  border-radius: 2px;

  & + div {
    margin-top: .50em;
  }
`;

const Title = styled.h1`
  grid-area: header;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  text-align: center;
`;