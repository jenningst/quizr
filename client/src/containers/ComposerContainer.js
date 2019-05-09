import React from 'react';
import styled from 'styled-components'
import { Query } from 'react-apollo';
import QuestionComposer from '../components/composer/QuestionComposer';
import QuestionCounter from '../components/QuestionCounter';
import { MediumButton } from '../components/common/Button';

import { GET_QUESTIONS } from '../queries/question';

const QuestionCounterOffline = () => (
  <CounterWrapper>
    <Title>Unable to Retrieve Data</Title>
    <MediumButton type="button">Refresh</MediumButton>
  </CounterWrapper>
)

const ComposerContainer = () => (
  <ComposerWrapper className="composer-wrapper">
    <QuestionComposer />
    <Query query={GET_QUESTIONS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading Questions";
        if (error) return <QuestionCounterOffline />;

        // destructure our fetched questions
        const { fetchQuestions: questions } = data;

        return (
          <QuestionCounter count={questions.length}/>
        )
      }}
    </Query>
  </ComposerWrapper>
);

export default ComposerContainer;

const ComposerWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 30%;
  grid-template-areas: 
    "main aside";
  grid-gap: 1em;
  height: 100%;

  padding: 1em;

  background: #edeff7;

  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
      "main";
  }
`;

const CounterWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;

  padding: 1em;

  background: #FFFFFF;
  border-radius: 5px;
`;

const Title = styled.h1`
  grid-area: header;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  text-align: center;
`;