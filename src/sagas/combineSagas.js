import {takeEvery} from 'redux-saga';
import {call, take} from 'redux-saga/effects';

import {handleAuthFlow} from './authSagas';
import {createExercise, deleteExercise, fetchExercises} from './exerciseSagas';
import {types} from '../actions';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchExercises(),
    watchCreateExercise(),
    watchDeleteExercise()
  ];
}

function* watchAuth() {
  while (true) {
    yield take(types.REQUEST_SIGN_IN);
    yield call(handleAuthFlow);
  }
}

function* watchExercises() {
  yield takeEvery(types.REQUEST_EXERCISES, fetchExercises);
}

function* watchCreateExercise() {
  yield takeEvery(types.CREATE_EXERCISE, createExercise);
}

function* watchDeleteExercise() {
  yield takeEvery(types.DELETE_EXERCISE, deleteExercise);
}