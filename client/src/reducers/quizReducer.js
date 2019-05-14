import React, { useReducer } from 'react';

// Choice Reducer
const initialChoices = [];
const choiceReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CHOICE':
      return [...state, action.choice];
    case 'REMOVE_CHOICE':
      let newState = [...state];
      return newState.splice(newState.indexOf(action.choice), 1);
    // case 'RESET_CHOICES':
    // return initChoices();
    default:
      return state;
  }
};

export { choiceReducer, initialChoices };