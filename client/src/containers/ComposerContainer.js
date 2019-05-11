import React from 'react';
import styled from 'styled-components'

import QuestionComposer from '../components/QuestionComposer/index';
import QuestionCounter from '../components/QuestionCounter';

import { Query } from 'react-apollo';
import { GET_QUESTIONS } from '../queries/questionQueries';

const QuestionCounterOffline = () => (
  <CounterWrapper>
    <Title>You Are Offline</Title>
  </CounterWrapper>
)

const ComposerContainer = () => (
  <ComposerWrapper className="composer-wrapper">
    <QuestionComposer />
    <Query query={GET_QUESTIONS}>
      {({ loading, error, data, refetch }) => {
        if (loading) return "Loading Questions";
        if (error) return <QuestionCounterOffline />;

        // destructure our fetched questions
        const { fetchQuestions: questions } = data;

        return (
          <QuestionCounter data={questions} refetch={refetch}/>
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
  background: #EFF3FB;

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
  border-radius: 8px;
`;

const Title = styled.h1`
  grid-area: header;
  font-family: 'Montserrat', sans-serif;
  color: #333333;
  font-size: 1.25em;
  text-align: center;
`;