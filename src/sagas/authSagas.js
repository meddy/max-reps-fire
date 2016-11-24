import {browserHistory} from 'react-router';
import {apply, call, take, put} from 'redux-saga/effects';

import actions, {types} from '../actions';
import {auth} from '../firebaseServices';

export function* handleAuthFlow() {
  const user = yield call(getAuthState);
  if (!user) {
    yield put(actions.touchAuth());
    return;
  }

  yield put(actions.receiveSignIn(user.displayName, user.uid));
  yield take(types.REQUEST_SIGN_OUT);
  yield apply(auth, auth.signOut);
  yield put(actions.receiveSignOut());
  yield call(browserHistory.replace, ['/']);
}

function getAuthState() {
  return new Promise(resolve =>
    auth.onAuthStateChanged(user => resolve(user))
  );
}
