import firebase from 'firebase';
import {fork, call, take, put} from 'redux-saga/effects';

import {receiveSignOut, REQUEST_SIGN_OUT} from '../actions';

function* signOut() {
  yield take(REQUEST_SIGN_OUT);
  const firebaseAuth = firebase.auth();
  yield call(firebaseAuth.signOut.bind(firebaseAuth));
  yield put(receiveSignOut());
}

export default function* rootSaga() {
  yield fork(signOut);
}