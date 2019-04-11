const ADD_QUESTION_CHOICE = "ADD_QUESTION_CHOICE";
const ADD_QUESTION_TITLE = "ADD_QUESTION_TITLE";

function reducer(state, action) {
  switch (action.type) {
    case ADD_QUESTION_CHOICE:
      return;
    case ADD_QUESTION_TITLE:
      return;
    default:
      console.log(action);
      return state;
  }
}

function addQuestionChoice(choice) {
  
}