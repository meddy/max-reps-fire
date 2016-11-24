import {eventChannel, takeEvery} from 'redux-saga';
import {call, fork, take, put, select} from 'redux-saga/effects';

import actions, {types} from '../actions';
import {db} from '../firebaseServices';

export default function* watchExercises() {
  yield takeEvery(types.REQUEST_EXERCISES, fetchExercises);
}

function* fetchExercises() {
  const exercises = yield call(fetchSystemExercises);
  yield put(actions.receiveExercises(exercises, 'system'));
  yield fork(watchUserExercises);
}

function* watchUserExercises() {
  const uid = yield select(state => state.user.uid);
  const path = `/users/${uid}/exercises`;
  const valueChannel = yield call(createDbValueChannel, path);

  while (true) {
    const exercises = yield take(valueChannel);
    yield put(actions.receiveExercises(exercises, 'user'));
  }
}

function createDbValueChannel(path) {
  return eventChannel(emit => {
    const ref = db.ref(path);
    const onValueChange = snapShot => emit(snapShot.val());

    ref.on('value', onValueChange);

    return () => ref.off('value', onValueChange);
  });
}

function fetchSystemExercises() {
  return db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}
