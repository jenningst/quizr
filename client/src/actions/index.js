/*
* ACTION CREATORS -- functions that create actions
*/

// STEP
export const setStep = step => ({ type: 'SET_STEP', step });
export const setMaxStepAllowed = step => ({ type: 'SET_MAX_STEP_ALLOWED', step });

// PROBLEM
export const setProblemType = index => ({ type: 'SET_PROBLEM_TYPE', index });
// export const setTitle = title => ({ type: 'SET_TITLE', title });
// export const addchoice = payload => ({ type: 'ADD_CHOICE', payload });
