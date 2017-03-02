// @flow

import actionTypes from './actionTypes';
import type {Action, ItemAction} from './types';

export function addExercise(name) {
  return {
    type: actionTypes.ADD_EXERCISE,
    key: name,
    value: name
  };
}

export function addExerciseTemplate(workoutTemplate, exerciseTemplate) {
  return {
    type: actionTypes.ADD_EXERCISE_TEMPLATE,
    value: exerciseTemplate,
    workoutTemplate
  };
}

export function addWorkoutTemplate(name) {
  return {
    type: actionTypes.ADD_WORKOUT_TEMPLATE,
    key: name,
    value: name
  };
}

export function removeExercise(key): ItemAction {
  return {
    type: actionTypes.REMOVE_EXERCISE,
    key
  };
}

export function removeExerciseTemplate(workoutTemplate, key) {
  return {
    type: actionTypes.REMOVE_EXERCISE_TEMPLATE,
    workoutTemplate,
    key
  };
}

export function removeWorkoutTemplate(key): ItemAction {
  return {
    type: actionTypes.REMOVE_WORKOUT_TEMPLATE,
    key
  };
}

export function receiveExercises(exercises, source) {
  return {
    type: actionTypes.RECEIVE_EXERCISES,
    exercises,
    source
  };
}

export function receiveExerciseTemplates(exerciseTemplatesGrouped) {
  return {
    type: actionTypes.RECEIVE_EXERCISE_TEMPLATES,
    exerciseTemplatesGrouped,
  };
}

export function receiveSignIn(name, uid) {
  return {
    type: actionTypes.RECEIVE_SIGN_IN,
    name,
    uid
  };
}

export function receiveSignOut() {
  return {
    type: actionTypes.RECEIVE_SIGN_OUT
  };
}

export function receiveWorkoutTemplates(workoutTemplates) {
  return {
    type: actionTypes.RECEIVE_WORKOUT_TEMPLATES,
    workoutTemplates
  };
}

export function requestExercises(): Action {
  return {
    type: actionTypes.REQUEST_EXERCISES
  };
}

export function requestExerciseTemplates(workoutTemplateKey): Action {
  return {
    type: actionTypes.REQUEST_EXERCISE_TEMPLATES,
    workoutTemplateKey
  };
}

export function requestSignIn(): Action {
  return {
    type: actionTypes.REQUEST_SIGN_IN
  };
}

export function requestSignOut(): Action {
  return {
    type: actionTypes.REQUEST_SIGN_OUT
  };
}

export function requestWorkoutTemplates(): Action {
  return {
    type: actionTypes.REQUEST_WORKOUT_TEMPLATES
  };
}

export function touchAuth(): Action {
  return {
    type: actionTypes.TOUCH_AUTH
  };
}
