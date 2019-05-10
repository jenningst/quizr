import { combineReducers } from 'redux';

import composer from './composer';
import quizzer from './quizzer';

export default combineReducers({
  compose: composer,
  quiz: quizzer,
});