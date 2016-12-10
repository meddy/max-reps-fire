import {combineReducers} from 'redux';
import reduceExerciseState from './reduceExerciseState';
import reduceUserState from './reduceUserState';
import reduceWorkoutTemplateState from './reduceWorkoutTemplateState';

export default combineReducers({
  exercise: reduceExerciseState,
  user: reduceUserState,
  workoutTemplate: reduceWorkoutTemplateState
});
