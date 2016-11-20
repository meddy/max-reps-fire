import {combineReducers} from 'redux';

import reduceExerciseState from './reduceExerciseState';
import reduceUserState from './reduceUserState';

export default combineReducers({
  exercise: reduceExerciseState,
  user: reduceUserState
});
