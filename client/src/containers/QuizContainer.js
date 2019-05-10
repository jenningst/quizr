import React from 'react';
import styled from 'styled-components';

import { Query } from 'react-apollo';
import { GET_QUESTIONS } from '../queries/questionQueries';

import Quiz from '../components/quiz/Quiz';

import { MODES } from '../constants/quizModes';

/* ** DATA & RENDER LOGIC ONLY ** */

const QuizContainer = () => {
  // const [questionSet, setQuestionSet] = useState([]);
  // const [key, setKey] = useState([]);

  // // generate the answer key for grading responses
  // useEffect(() => {
  //   if (questionSet.length > 0) {
  //     // existing answerKey, concat the new and the old together and increase
  //     const newQuestionSet = generateAnswerKeyFromQuestions(questionSet);
  //     setKey([...questionSet, newQuestionSet]);
  //   }
  //   setKey(generateAnswerKeyFromQuestions(questionSet));
  //   console.log(questionSet);
  // }, [questionSet]);

  return (
    <QuizWrapper>
      <Query query={GET_QUESTIONS}>
        {({ loading, error, data }) => {
          // fall-back UI
          if (loading) return "Loading Questions";
          if (error) return `Error loading questions: ${error.message}`;

          // destructure our fetched questions
          const { fetchQuestions: questions } = data;

          // render quiz
          return (
            <Quiz
              mode={MODES.LEARNING_MODE}
              questionSet={questions}
              answerKey={generateAnswerKeyFromQuestions(questions)}
            />
          );
        }}
      </Query>
    </QuizWrapper>
  );
  
  /**
   * Creates an object to hold the answer key and all quiz choices. Used to 
   * grade individual questions or an entire question set.
   */
  function generateAnswerKeyFromQuestions(questionArray) {
    let answerKey = {};

    // for each question, get id of each choice that is an answer
    for (let i = 0; i < questionArray.length; i++) {
      let newObj = {};
      newObj.answers = 
      questionArray[i].choices
          .filter(choice => choice.isAnswer === true)
          .map(answers => answers._id);
      newObj.choices = [];
      newObj.status = 'unanswered';
      // add the question's data to a new object
      answerKey[questionArray[i]._id] = newObj;
    }
    return answerKey
  }
};

export default QuizContainer;

const QuizWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  height: 100%;
`;