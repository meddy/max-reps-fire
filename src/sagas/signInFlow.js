import firebase from 'firebase';
import {browserHistory} from 'react-router';
import {fork, call, take, put} from 'redux-saga/effects'

function* authenticate() {
  try {
    const result = yield call(firebase.auth().getRedirectResult);
    yield put({type: 'SIGN_IN_SUCCESS', result});
    yield call(browserHistory.push, ['/workouts']);
  } catch(error) {
    yield put({type: 'SIGN_IN_ERROR', error});
  }
}

export default function* signInFlow() {
  while (true) {
    yield take('SIGN_IN_REQUEST');
    yield fork(authenticate);
    yield take(['LOGOUT', 'SIGN_IN_ERROR']);
    yield call(browserHistory.push, ['/sign-in'])
  }
}

// initialize app
// get redirect result
  // if result -> authenticate
  // else not authenticated

