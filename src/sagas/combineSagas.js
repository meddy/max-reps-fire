import {browserHistory} from 'react-router';
import {takeEvery} from 'redux-saga';
import {apply, call, take, put} from 'redux-saga/effects';

import {auth, db} from '../firebaseServices';
import actions, {types} from '../actions';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchExercises()
  ];
}

function* watchAuth() {
  while (true) {
    yield take(types.REQUEST_SIGN_IN);

    const user = yield call(getAuthState);
    if (!user) {
      yield put(actions.touchAuth());
      continue;
    }

    yield put(actions.receiveSignIn(user.displayName, user.uid));
    yield take(types.REQUEST_SIGN_OUT);
    yield apply(auth, auth.signOut);
    yield put(actions.receiveSignOut());
    yield call(browserHistory.replace, ['/']);
  }
}

function* watchExercises() {
  yield takeEvery(types.REQUEST_EXERCISES, fetchExercises);
}

function* fetchExercises() {
  const systemExercises = yield call(fetchSystemExercises);
  yield put(actions.receiveExercises(systemExercises, null));
}

function getAuthState() {
  return new Promise(resolve =>
    auth.onAuthStateChanged(user => resolve(user))
  );
}

function fetchSystemExercises() {
    return db
      .ref('/exercises')
      .once('value')
      .then(snapshot => snapshot.val());
}
