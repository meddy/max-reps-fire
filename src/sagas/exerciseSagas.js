import {call, fork, put} from 'redux-saga/effects';
import {receiveExercises} from '../actions/creators';
import {db} from '../bootstrap/firebaseServices';
import {createWatchPath, createAddItem, createRemoveItem} from '../helpers/sagaHelpers';

const pathName = 'exercises';

export const channelExercises = createWatchPath(pathName, receiveExercises, ['user']);
export const addExercise = createAddItem(pathName);
export const removeExercise = createRemoveItem(pathName);

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
