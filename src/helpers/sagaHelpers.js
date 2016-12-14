import {eventChannel} from 'redux-saga';
import {call, put, select, take} from 'redux-saga/effects';
import {getUid} from '../selectors';
import {db, paths} from '../bootstrap/firebaseServices';

export function createWatchPath(pathName, receiveActionCreator, actionArgs = []) {
  return function*() {
    const uid = yield select(getUid);
    const path = paths[pathName](uid);
    const valueChannel = yield call(createDbValueChannel, path);

    while (true) {
      const data = yield take(valueChannel);
      yield put(receiveActionCreator.apply(null, [data, ...actionArgs]));
    }
  };
}

export function createAddItem(pathName) {
  return function*(action) {
    const uid = yield select(getUid);
    const path = paths[pathName](uid);
    const {key, value} = action;

    if (value) {
      yield call(setItem, path, key, value);
    } else {
      yield call(pushItem, path, value);
    }

  };
}

export function createRemoveItem(pathName) {
  return function*(action) {
    const uid = yield select(getUid);
    yield call(setItem, paths[pathName](uid), action.key, null);
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
