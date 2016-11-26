import {call, select} from 'redux-saga/effects';
import {db, paths} from '../firebaseServices';

import {getUid} from '../selectors';

export function* createWorkoutTemplate(action) {
  const uid = yield select(getUid);
  yield call(setWorkoutTemplate, uid, action.name);
}

function setWorkoutTemplate(uid, name, value = name) {
  const path = paths.userExercises(uid) + '/' + name;
  return db.ref(path).set(value);
}
