import React from 'react';
import { Query } from 'react-apollo';

import { GET_QUESTIONS } from '../../queries/question';

const QuestionCollection = () => {
  return (
    <Query query={GET_QUESTIONS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <ul>
            {data.fetchQuestions.map(question => (
              <li key={question._id}>{question._id}: {question.title}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default QuestionCollection;