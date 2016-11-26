import {eventChannel} from 'redux-saga';
import {call, fork, put, select, take} from 'redux-saga/effects';

import actions from '../actions';
import {db, paths} from '../firebaseServices';
import {getUid} from '../selectors';

export function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(actions.receiveExercises(exercises, 'system'));
  yield fork(watchUserExercises);
}

export function* watchUserExercises() {
  const uid = yield select(getUid);
  const path = paths.userExercises(uid);
  const valueChannel = yield call(createDbValueChannel, path);

  while (true) {
    const exercises = yield take(valueChannel);
    yield put(actions.receiveExercises(exercises, 'user'));
  }
}

export function* createExercise(action) {
  const uid = yield select(getUid);
  yield call(setExercise, uid, action.name);
}

export function* deleteExercise(action) {
  const uid = yield select(getUid);
  yield call(setExercise, uid, action.name, null);
}

function fetchSystemExercises() {
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}

function createDbValueChannel(path) {
  return eventChannel(emit => {
    const ref = db.ref(path);
    const onValueChange = snapshot => emit(snapshot.val());

    ref.on('value', onValueChange);

    return () => ref.off('value', onValueChange);
  });
}

function setExercise(uid, name, value = name) {
  const path = paths.userExercises(uid) + '/' + name;
  return db.ref(path).set(value);
}
