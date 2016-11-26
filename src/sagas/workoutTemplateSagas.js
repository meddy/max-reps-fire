import {call, fork, put, select, take} from 'redux-saga/effects';
import {db, paths} from '../firebaseServices';

import actions from '../actions';
import createDbValueChannel from '../helpers/createDbValueChannel';
import {getUid} from '../selectors';

export function* createWorkoutTemplate(action) {
  const uid = yield select(getUid);
  yield call(setWorkoutTemplate, uid, action.name);
}

export function* fetchWorkoutTemplates() {
  yield fork(watchWorkoutTemplates);
}

function setWorkoutTemplate(uid, name, value = name) {
  const path = paths.userExercises(uid) + '/' + name;
  return db.ref(path).set(value);
}

function watchWorkoutTemplates() {
  const uid = yield select(getUid);
  const path = paths.workoutTemplates(uid);
  const valueChannel = yield call(createDbValueChannel, path);

  while (true) {
    const exercises = yield take(valueChannel);
    yield put(actions.receiveExercises(exercises, 'user'));
  }
}
