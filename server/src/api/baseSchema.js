const { gql } = require('apollo-server-express');

const base = gql`
  type Query {
    questions: [Question!]!
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): CreateQuestionPayload!
  }

  type DetailsPayload {
    code: String!
    success: Boolean!
    message: String!
    ## any other error fields we need
  }
`;

module.exports = base;