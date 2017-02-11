import * as types from './types';

export function addExercise(name) {
  return {
    type: types.ADD_EXERCISE,
    key: name,
    value: name
  };
}

export function addExerciseTemplate(workoutTemplate, exerciseTemplate) {
  return {
    type: types.ADD_EXERCISE_TEMPLATE,
    value: exerciseTemplate,
    workoutTemplate
  };
}

export function addWorkoutTemplate(name) {
  return {
    type: types.ADD_WORKOUT_TEMPLATE,
    key: name,
    value: {name}
  };
}

export function removeExercise(key) {
  return {
    type: types.REMOVE_EXERCISE,
    key
  };
}
export function removeWorkoutTemplate(key) {
  return {
    type: types.REMOVE_WORKOUT_TEMPLATE,
    key
  };
}

export function receiveExercises(exercises, source) {
  return {
    type: types.RECEIVE_EXERCISES,
    exercises,
    source
  };
}

export function receiveExerciseTemplates(exerciseTemplatesGrouped) {
  return {
    type: types.RECEIVE_EXERCISE_TEMPLATES,
    exerciseTemplatesGrouped,
  };
}

export function receiveSignIn(name, uid) {
  return {
    type: types.RECEIVE_SIGN_IN,
    name,
    uid
  };
}

export function receiveSignOut() {
  return {type: types.RECEIVE_SIGN_OUT};
}

export function receiveWorkoutTemplates(workoutTemplates) {
  return {
    type: types.RECEIVE_WORKOUT_TEMPLATES,
    workoutTemplates
  };
}

export function requestExercises() {
  return {type: types.REQUEST_EXERCISES};
}

export function requestExerciseTemplates(workoutTemplateKey) {
  return {type: types.REQUEST_EXERCISE_TEMPLATES, workoutTemplateKey};
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
