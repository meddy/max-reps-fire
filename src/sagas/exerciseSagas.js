import {call, fork, put} from 'redux-saga/effects';
import {receiveExercises} from '../actions/creators';
import {db} from '../bootstrap/firebaseServices';
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
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
