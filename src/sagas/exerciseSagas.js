import {call, fork, put} from 'redux-saga/effects';

import actions from '../actions';
import {db} from '../firebaseServices';
import {createWatchPath, createAddItem, createRemoveItem} from '../helpers/sagaHelpers';

export const watchUserExercises = createWatchPath(
  'exercises',
  actions.receiveExercises,
  ['user']
);

export const addExercise = createAddItem('exercises');
export const removeExercise = createRemoveItem('exercises');

export function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(actions.receiveExercises(exercises, 'system'));
  yield fork(watchUserExercises);
}

function fetchSystemExercises() {
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
