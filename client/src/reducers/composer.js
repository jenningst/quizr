/*
* REDUCERS-- functions that specify state changes
*/
import {
  SET_STEP,
  SET_MAX_STEP_ALLOWED,
  SET_PROBLEM_TYPE
} from '../constants/actionTypes';
import { MODES as COMPOSER_MODES } from '../constants/composerModes';

const initialState = {
  modes: COMPOSER_MODES,
  currentStep: 1,
  maxStepAllowed: 1,
  problemTypeIndex: null,
  problemTitle: "",
  choiceIndex: 0,
  choices:[
    // { text:"1",isAnswer:false },
    // { text:"2", isAnswer:true },
    // { text:"4", isAnswer:false },
    // { text:"8", isAnswer:false },
    // { text:"16", isAnswer:false },
  ],
};

// the function name here doesn't really matter; we rename in the rootReducer
export default function questionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STEP:
      return { ...state, currentStep: action.step };
    case SET_MAX_STEP_ALLOWED:
      return { ...state, maxStepAllowed: action.step };
    case SET_PROBLEM_TYPE:
      return { ...state, problemTypeIndex: action.index };
    default:
      return state;
  }
}