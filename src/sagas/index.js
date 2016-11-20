import firebase from 'firebase';
import {browserHistory} from 'react-router';
import {apply, fork, call, take, put} from 'redux-saga/effects';

import actions, {types} from '../actions';

export default function* rootSaga() {
  yield fork(authFlow);
}

function* authFlow() {
  const firebaseAuth = firebase.auth();

  while (true) {
    yield take(types.REQUEST_SIGN_IN);

    const user = yield call(getAuthState);
    if (!user) {
      yield put(actions.touchAuth());
      continue;
    }

    yield put(actions.receiveSignIn(user.displayName));
    yield take(types.REQUEST_SIGN_OUT);
    yield apply(firebaseAuth, firebaseAuth.signOut);
    yield put(actions.receiveSignOut());
    yield call(browserHistory.replace, ['/']);
  }
}

function getAuthState() {
  return new Promise(resolve => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        console.log('test');
        resolve(user);
      });
  });
}
