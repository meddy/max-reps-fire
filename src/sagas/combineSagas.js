import {takeEvery} from 'redux-saga';
import {call, take} from 'redux-saga/effects';

import {
  ADD_EXERCISE,
  ADD_WORKOUT_TEMPLATE,
  REMOVE_EXERCISE,
  REMOVE_WORKOUT_TEMPLATE,
  REQUEST_EXERCISES,
  REQUEST_SIGN_IN,
  REQUEST_WORKOUT_TEMPLATES
} from '../actionTypes';

import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';
import {addWorkoutTemplate, channelWorkoutTemplates, removeWorkoutTemplate} from './workoutTemplateSagas';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchAddExercise(),
    watchAddWorkoutTemplate(),
    watchRemoveExercise(),
    watchRemoveWorkoutTemplate(),
    watchRequestExercises(),
    watchRequestWorkoutTemplates()
  ];
}

function* watchAuth() {
  while (true) {
    yield take(REQUEST_SIGN_IN);
    yield call(handleAuthFlow);
  }
}

function* watchAddExercise() {
  yield takeEvery(ADD_EXERCISE, addExercise);
}

function* watchRemoveExercise() {
  yield takeEvery(REMOVE_EXERCISE, removeExercise);
}

function* watchRequestExercises() {
  yield takeEvery(REQUEST_EXERCISES, fetchExercises);
}

function* watchAddWorkoutTemplate() {
  yield takeEvery(ADD_WORKOUT_TEMPLATE, addWorkoutTemplate);
}

function* watchRemoveWorkoutTemplate() {
  yield takeEvery(REMOVE_WORKOUT_TEMPLATE, removeWorkoutTemplate);
}

function* watchRequestWorkoutTemplates() {
  yield takeEvery(REQUEST_WORKOUT_TEMPLATES, channelWorkoutTemplates);
}
