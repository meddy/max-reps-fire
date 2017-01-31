import {combineReducers} from 'redux';
import reduceExercise from './reduceExercise';
import reduceExerciseTemplate from './reduceExerciseTemplate';
import reduceUser from './reduceUser';
import reduceWorkoutTemplate from './reduceWorkoutTemplate';

export default combineReducers({
  exercise: reduceExercise,
  exerciseTemplate: reduceExerciseTemplate,
  user: reduceUser,
  workoutTemplate: reduceWorkoutTemplate
});
