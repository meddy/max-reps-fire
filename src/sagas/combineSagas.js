import {takeEvery} from 'redux-saga';
import {call, take} from 'redux-saga/effects';

import {
  ADD_EXERCISE,
  REMOVE_EXERCISE,
  REQUEST_EXERCISES,
  REQUEST_SIGN_IN
} from '../actionTypes';

import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchExercises(),
    watchAddExercise(),
    watchRemoveExercise()
  ];
}

function* watchAuth() {
  while (true) {
    yield take(REQUEST_SIGN_IN);
    yield call(handleAuthFlow);
  }
}

function* watchExercises() {
  yield takeEvery(REQUEST_EXERCISES, fetchExercises);
}

function* watchAddExercise() {
  yield takeEvery(ADD_EXERCISE, addExercise);
}

function* watchRemoveExercise() {
  yield takeEvery(REMOVE_EXERCISE, removeExercise);
}
