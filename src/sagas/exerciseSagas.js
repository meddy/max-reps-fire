import {call, fork, put} from 'redux-saga/effects';
import {receiveExercises} from '../actions';
import {getServices} from '../helpers/createFirebase';
import createDatabaseSagas from '../helpers/createDatabaseSagas';
import {getExercisePath} from '../helpers/selectors';

const exerciseSagas = createDatabaseSagas(getExercisePath);
const exerciseSource = 'user';

export const channelExercises = exerciseSagas.createWatchPath(receiveExercises, [exerciseSource]);
export const addExercise = exerciseSagas.addItem;
export const removeExercise = exerciseSagas.removeItem;

export function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(receiveExercises(exercises, 'system'));
  yield fork(channelExercises);
}

function fetchSystemExercises() {
  return getServices()
    .db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
