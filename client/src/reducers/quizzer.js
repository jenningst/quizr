// TODO: add other state later
const initialState = {
  // currentStep: 1,
  // maxStepAllowed: 1,
  questions : [
    {
      "title":"What is 1 + 1?",
      "choices":[
        { "text":"1","isAnswer":false },
        { "text":"2", "isAnswer":true },
        { "text":"4", "isAnswer":false },
        { "text":"8", "isAnswer":false },
        { "text":"16", "isAnswer":false },
      ]
    },
  ]
};

// the function name here doesbn't really matter; we rename in the rootReducer
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}