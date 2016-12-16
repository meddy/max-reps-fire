import {eventChannel} from 'redux-saga';
import {call, put, select, take} from 'redux-saga/effects';
import {db, paths} from '../bootstrap/firebaseServices';

export function createWatchPath(pathSelector, receiveActionCreator, actionArgs = []) {
  return function*() {
    const path = yield select(pathSelector);
    const valueChannel = yield call(createDbValueChannel, path);

    while (true) {
      const data = yield take(valueChannel);
      yield put(receiveActionCreator.apply(null, [data, ...actionArgs]));
    }
  };
}

export function createAddItem(pathSelector) {
  return function*(action) {
    const path = yield select(pathSelector);
    const {key, value} = action;

    if (value) {
      yield call(setItem, path, key, value);
    } else {
      yield call(pushItem, path, value);
    }

  };
}

export function createRemoveItem(pathSelector) {
  return function*(action) {
    const path = yield select(pathSelector);
    yield call(setItem, path, action.key, null);
  };
}

function createDbValueChannel(path) {
  return eventChannel(emit => {
    const ref = db.ref(path);
    const onValueChange = snapshot => emit(snapshot.val() || {});

    ref.on('value', onValueChange);

    return () => ref.off('value', onValueChange);
  });
}

function setItem(path, key, value) {
  path = path + '/' + key;
  return db.ref(path).set(value);
}

function pushItem(path, value) {
  return db.ref(path).push(value);
}
