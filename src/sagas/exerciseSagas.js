import {call, fork, put} from 'redux-saga/effects';
import {receiveExercises} from '../actions/creators';
import {db} from '../bootstrap/firebaseServices';
import {createWatchPath, createAddItem, createRemoveItem} from '../helpers/sagaHelpers';
import {getExercisePath} from '../selectors';

export const channelExercises = createWatchPath(
  getExercisePath,
  receiveExercises,
  ['user']
);

export const addExercise = createAddItem(getExercisePath);
export const removeExercise = createRemoveItem(getExercisePath);

export function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(receiveExercises(exercises, 'system'));
  yield fork(channelExercises);
}

function fetchSystemExercises() {
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
