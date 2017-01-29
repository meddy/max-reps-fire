import {eventChannel} from 'redux-saga';
import {call, put, select, take} from 'redux-saga/effects';
import {db} from '../bootstrap/firebaseServices';

export default function createDatabaseSagas(getPath) {
  return {
    createWatchPath: (receiveItems, actionArgs = []) => {
      return function*() {
        const path = yield select(getPath);
        const valueChannel = yield call(createDbValueChannel, path);

        while (true) {
          const data = yield take(valueChannel);
          yield put(receiveItems.apply(null, [data, ...actionArgs]));
        }
      };
    },
    addItem: function*(action) {
      const path = yield select(getPath);
      const {key, value} = action;

      if (value) {
        yield call(setItem, path, key, value);
      } else {
        yield call(pushItem, path, value);
      }
    },
    removeItem: function*(action) {
      const path = yield select(getPath);
      yield call(setItem, path, action.key, null);
    }
  };
}

function createDbValueChannel(path) {
  return eventChannel(emit => {
    const ref = db.ref(path);
    const onValueChange = snapshot => emit(snapshot.val() || {});
    const unsubscribe = () => ref.off('value', onValueChange);

    ref.on('value', onValueChange);

    return unsubscribe;
  });
}

function setItem(path, key, value) {
  path = path + '/' + key;
  return db.ref(path).set(value);
}

function pushItem(path, value) {
  return db.ref(path).push(value);
}
