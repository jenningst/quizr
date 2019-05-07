const { gql } = require('apollo-server-express');

const question = gql`
  type Question {
    _id: ID!
    title: String!
    choices: [Choice!]
  }

  input CreateQuestionInput {
    title: String!
    choices: [CreateChoiceInput!]!
  }

  input DeleteQuestionInput {
    _id: String!
  }

  interface QuestionPayload {
    question: Question
    details: DetailsPayload
  }

  type CreateQuestionPayload implements QuestionPayload {
    question: Question
    details: DetailsPayload
  }

  type DeleteQuestionPayload implements QuestionPayload {
    question: Question
    details: DetailsPayload
  }
`;

module.exports = question;