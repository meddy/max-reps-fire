import {createActionCreator} from './helpers/reducerHelpers';

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_EXERCISE_TEMPLATE = 'ADD_EXERCISE_TEMPLATE';
export const ADD_WORKOUT_TEMPLATE = 'ADD_WORKOUT_TEMPLATE';
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE';
export const REMOVE_EXERCISE_TEMPLATE = 'REMOVE_EXERCISE_TEMPLATE';
export const REMOVE_WORKOUT_TEMPLATE = 'REMOVE_WORKOUT_TEMPLATE';
export const RECEIVE_EXERCISES = 'RECEIVE_EXERCISES';
export const RECEIVE_EXERCISE_TEMPLATES = 'RECEIVE_EXERCISE_TEMPLATES';
export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const RECEIVE_WORKOUT_TEMPLATES = 'RECEIVE_WORKOUT_TEMPLATES';
export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
export const REQUEST_EXERCISE_TEMPLATES = 'REQUEST_EXERCISE_TEMPLATES';
export const REQUEST_AUTH = 'REQUEST_AUTH';
export const REQUEST_WORKOUT_TEMPLATES = 'REQUEST_WORKOUT_TEMPLATES';
export const SIGN_OUT = 'SIGN_OUT';

export const addExercise = (exercise) => ({
  type: ADD_EXERCISE,
  key: exercise,
  value: exercise
});

export const addExerciseTemplate = createActionCreator(ADD_EXERCISE_TEMPLATE, 'workoutTemplate', 'exerciseTemplate');

export const addWorkoutTemplate = (workoutTemplate) => ({
  type: ADD_WORKOUT_TEMPLATE,
  key: workoutTemplate,
  value: workoutTemplate
});

export const removeExercise = createActionCreator(REMOVE_EXERCISE, 'key');
export const removeExerciseTemplate = createActionCreator(REMOVE_EXERCISE_TEMPLATE, 'workoutTemplate', 'key');
export const removeWorkoutTemplate = createActionCreator(REMOVE_WORKOUT_TEMPLATE, 'key');
export const receiveExercises = createActionCreator(RECEIVE_EXERCISES, 'exercises', 'source');
export const receiveExerciseTemplates = createActionCreator(RECEIVE_EXERCISE_TEMPLATES);
export const receiveAuth = createActionCreator(RECEIVE_AUTH, 'user');
export const receiveWorkoutTemplates = createActionCreator(RECEIVE_WORKOUT_TEMPLATES, 'workoutTemplates');
export const requestExercises = createActionCreator(REQUEST_EXERCISES);
export const requestExerciseTemplates = createActionCreator(REQUEST_EXERCISE_TEMPLATES);
export const requestAuth = createActionCreator(REQUEST_AUTH);
export const requestWorkoutTemplates = createActionCreator(REQUEST_WORKOUT_TEMPLATES);
export const signOut = createActionCreator(SIGN_OUT);
