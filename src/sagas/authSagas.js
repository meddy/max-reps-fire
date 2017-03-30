import {browserHistory} from 'react-router';
import {apply, call, take, put} from 'redux-saga/effects';
import {receiveAuthResponse, receiveSignIn, receiveSignOut, touchAuth} from '../actions';
import {REQUEST_SIGN_OUT} from '../actions';
import {getServices} from '../helpers/createFirebase';

// not sure about "handle" maybe "workAuthFlow"
export function* handleAuthFlow() {
  const user = yield call(getAuthState);
  if (!user) {
    yield put(receiveAuthResponse(null));
    return;
  }

  // yield put(receiveAuthResponse(user.displayName, user.uid));
  yield put(receiveAuthResponse(user));

  // I think we can simplify this,
  yield take(REQUEST_SIGN_OUT);
  yield apply(getServices.auth, getServices.auth.signOut);
  yield put(receiveSignOut());
  yield call(browserHistory.replace, ['/']);
}

function getAuthState() {
  return new Promise(resolve =>
    getServices().auth.onAuthStateChanged(user => resolve(user))
  );
}
