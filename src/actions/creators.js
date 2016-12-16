import * as types from './types';

export function addExercise(name) {
  return {
    type: types.ADD_EXERCISE,
    key: name,
    value: name
  };
}

export function addWorkoutTemplate(name) {
  return {
    type: types.ADD_WORKOUT_TEMPLATE,
    key: name,
    value: {name}
  };
}

export function removeExercise(name) {
  return {
    type: types.REMOVE_EXERCISE,
    key: name
  };
}
export function removeWorkoutTemplate(name) {
  return {
    type: types.REMOVE_WORKOUT_TEMPLATE,
    key: name
  };
}

export function addExerciseTemplate(exerciseTemplate) {
  return {
    type: types.ADD_EXERCISE_TEMPLATE,
    ...exerciseTemplate
  };
}

export function receiveExercises(exercises, source) {
  return {type: types.RECEIVE_EXERCISES, exercises, source};
}

export function receiveSignIn(name, uid) {
  return {type: types.RECEIVE_SIGN_IN, name, uid};
}

export function receiveSignOut() {
  return {type: types.RECEIVE_SIGN_OUT};
}

export function receiveWorkoutTemplates(workoutTemplates) {
  return {type: types.RECEIVE_WORKOUT_TEMPLATES, workoutTemplates};
}

export function requestExercises() {
  return {type: types.REQUEST_EXERCISES};
}

export function requestSignIn() {
  return {type: types.REQUEST_SIGN_IN};
}

export function requestSignOut() {
  return {type: types.REQUEST_SIGN_OUT};
}

export function requestWorkoutTemplates() {
  return {type: types.REQUEST_WORKOUT_TEMPLATES};
}

export function touchAuth() {
  return {type: types.TOUCH_AUTH};
}
