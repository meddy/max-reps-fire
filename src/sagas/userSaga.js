import { fork, call, take, put } from 'redux-saga/effects'
import firebase from 'firebase';

function* authenticate() {
  try {
    const result = yield call(firebase.auth().getRedirectResult);
    yield put({type: 'LOGIN_SUCCESS', result});
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

export function* loginFlow() {
  while (true) {
    yield take('LOGIN_REQUEST');
    yield fork(authenticate);
    yield take(['LOGOUT', 'LOGIN_ERROR']);
  }
}
