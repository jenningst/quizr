const { gql } = require('apollo-server-express');

const choice = gql`
  type Choice {
    _id: ID!
    text: String!
    isAnswer: Boolean!
  }

  input CreateChoiceInput {
    text: String!
    isAnswer: Boolean!
  }

  input DeleteChoiceInput {
    _id: String!
  }

  interface ChoicePayload {
    details: DetailsPayload
    choice: Choice
  }

  type CreateChoicePayload implements ChoicePayload {
    details: DetailsPayload
    choice: Choice
  }

  type DeleteChoicePayload implements ChoicePayload {
    details: DetailsPayload
    choice: Choice
  }
`;

module.exports = choice;