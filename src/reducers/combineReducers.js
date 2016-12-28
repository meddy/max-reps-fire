import {combineReducers} from 'redux';
import reduceExercise from './reduceExercise';
import reduceUser from './reduceUser';
import reduceWorkoutTemplate from './reduceWorkoutTemplate';

export default combineReducers({
  exercise: reduceExercise,
  user: reduceUser,
  workoutTemplate: reduceWorkoutTemplate
});
