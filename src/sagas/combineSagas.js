import {takeEvery} from 'redux-saga';
import {call, take} from 'redux-saga/effects';

import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';
import {types} from '../actions';

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
    yield take(types.REQUEST_SIGN_IN);
    yield call(handleAuthFlow);
  }
}

function* watchExercises() {
  yield takeEvery(types.REQUEST_EXERCISES, fetchExercises);
}

function* watchAddExercise() {
  yield takeEvery(types.ADD_EXERCISE, addExercise);
}

function* watchRemoveExercise() {
  yield takeEvery(types.REMOVE_EXERCISE, removeExercise);
}
