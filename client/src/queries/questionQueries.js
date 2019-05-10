import { gql } from 'apollo-boost';

const CREATE_QUESTION = gql`
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        _id
        title
        choices {
          _id
          text
          isAnswer
        }
      }
      details {
        code
        success
        message
      }
    }
  }
`;

// const DELETE_QUESTION = gql`
//   mutation deleteQuestion($input: DeleteQuestionInput!) {
//     deleteQuestion(input: $input) {
      
//     }
//   }
// `;

const GET_QUESTIONS = gql`
  query fetchQuestions {
    fetchQuestions {
      _id
      title
      choices {
        _id
        text
        isAnswer
      }
    }
  }
`;

const GET_QUESTION_COUNT = gql`
  query fetchQuestionCount {
    fetchQuestionCount {
      count
    }
  }
`;

export { CREATE_QUESTION, GET_QUESTIONS, GET_QUESTION_COUNT };