import {browserHistory} from 'react-router';
import {apply, call, take, put} from 'redux-saga/effects';
import {receiveSignIn, receiveSignOut, touchAuth} from '../actions/creators';
import {REQUEST_SIGN_OUT} from '../actions/types';
import {auth} from '../bootstrap/firebaseServices';

export function* handleAuthFlow() {
  const user = yield call(getAuthState);
  if (!user) {
    yield put(touchAuth());
    return;
  }

  yield put(receiveSignIn(user.displayName, user.uid));
  yield take(REQUEST_SIGN_OUT);
  yield apply(auth, auth.signOut);
  yield put(receiveSignOut());
  yield call(browserHistory.replace, ['/']);
}

function getAuthState() {
  return new Promise(resolve =>
    auth.onAuthStateChanged(user => resolve(user))
  );
}
