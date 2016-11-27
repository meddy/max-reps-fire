import {call, fork, put} from 'redux-saga/effects';

import {receiveExercises} from '../actionCreators';
import {db} from '../firebaseServices';
import {createWatchPath, createAddItem, createRemoveItem} from '../helpers/sagaHelpers';

const pathName = 'exercises';

export const watchExercises = createWatchPath(pathName, receiveExercises, ['user']);
export const addExercise = createAddItem(pathName);
export const removeExercise = createRemoveItem(pathName);

export function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(receiveExercises(exercises, 'system'));
  yield fork(watchExercises);
}

function fetchSystemExercises() {
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
