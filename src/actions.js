import {createActions} from 'redux-actions';

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const ADD_EXERCISE_TEMPLATE = 'ADD_EXERCISE_TEMPLATE';
export const ADD_WORKOUT_TEMPLATE = 'ADD_WORKOUT_TEMPLATE';
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE';
export const REMOVE_EXERCISE_TEMPLATE = 'REMOVE_EXERCISE_TEMPLATE';
export const REMOVE_WORKOUT_TEMPLATE = 'REMOVE_WORKOUT_TEMPLATE';
export const RECEIVE_EXERCISES = 'RECEIVE_EXERCISES';
export const RECEIVE_EXERCISE_TEMPLATES = 'RECEIVE_EXERCISE_TEMPLATES';
export const RECEIVE_AUTH_RESPONSE = 'RECEIVE_AUTH_RESPONSE';
// RECEIVE_AUTH_RESPONSE, use for both user was/was not logged in
// I think we can simplify sign out to just SIGN_OUT
export const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT';
export const RECEIVE_WORKOUT_TEMPLATES = 'RECEIVE_WORKOUT_TEMPLATES';
export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
export const REQUEST_EXERCISE_TEMPLATES = 'REQUEST_EXERCISE_TEMPLATES';
export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT';
export const REQUEST_WORKOUT_TEMPLATES = 'REQUEST_WORKOUT_TEMPLATES';

const actionMap = {
  [ADD_EXERCISE_TEMPLATE]: (workoutTemplate, exerciseTemplate) => ({workoutTemplate, value: exerciseTemplate}),
  [REMOVE_EXERCISE_TEMPLATE]: (workoutTemplate, key) => ({workoutTemplate, key}),
  [RECEIVE_EXERCISES]: (exercises, source) => ({exercises, source}),
};

export const {
  addExercise,
  addExerciseTemplate,
  addWorkoutTemplate,
  removeExercise,
  removeExerciseTemplate,
  receiveAuthResponse,
  receiveExercises,
  receiveExerciseTemplates,
  receiveSignIn,
  receiveSignOut,
  receiveWorkoutTemplates,
  requestExercises,
  requestExerciseTemplates,
  requestSignIn,
  requestSignOut,
  requestWorkoutTemplates
} = createActions(
  actionMap,
  ADD_EXERCISE,
  ADD_WORKOUT_TEMPLATE,
  REMOVE_EXERCISE,
  REMOVE_WORKOUT_TEMPLATE,
  RECEIVE_AUTH_RESPONSE,
  RECEIVE_EXERCISE_TEMPLATES,
  RECEIVE_SIGN_OUT,
  RECEIVE_WORKOUT_TEMPLATES,
  REQUEST_EXERCISES,
  REQUEST_EXERCISE_TEMPLATES,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_WORKOUT_TEMPLATES,
);
