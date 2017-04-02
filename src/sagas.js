import {replace, LOCATION_CHANGED} from 'redux-little-router';
import {apply, call, fork, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  receiveAuth,
  receiveExercises,
  receiveExerciseTemplates,
  receiveWorkoutTemplates,
  requestExercises,
  requestWorkoutTemplates,
  ADD_EXERCISE,
  ADD_EXERCISE_TEMPLATE,
  ADD_WORKOUT_TEMPLATE,
  RECEIVE_WORKOUT_TEMPLATES,
  REMOVE_EXERCISE,
  REMOVE_EXERCISE_TEMPLATE,
  REMOVE_WORKOUT_TEMPLATE,
  REQUEST_AUTH,
  REQUEST_EXERCISES,
  REQUEST_EXERCISE_TEMPLATES,
  REQUEST_WORKOUT_TEMPLATES,
  SIGN_OUT
} from './actions';
import createDatabaseSagas from './helpers/createDatabaseSagas';
import {getServices} from './helpers/createFirebase';
import {getExercisePath, getExerciseTemplatePath, getWorkoutTemplate, getWorkoutTemplatePath} from './helpers/selectors';
import {EXERCISE_LIST, NO_MATCH, WORKOUT_TEMPLATE_EDIT, WORKOUT_TEMPLATE_VIEW} from './routes';

export default function* rootSaga() {
  return yield [
    takeLatest(REQUEST_AUTH, handleAuthFlow),
    call(watchExerciseActions),
    call(watchExerciseTemplateActions),
    call(watchWorkoutTemplateActions),
    takeLatest(LOCATION_CHANGED, onLocationChange)
  ];
}

function* handleAuthFlow() {
  const {auth} = getServices();

  const user = yield call(() => {
    return new Promise((resolve) => {
      auth.onAuthStateChanged(user => resolve(user));
    });
  });

  if (!user) {
    yield put(receiveAuth(null));
    return;
  }

  yield put(receiveAuth(user));
  yield put(requestWorkoutTemplates());

  yield take(SIGN_OUT);
  yield apply(auth, auth.signOut);
  yield put(replace('/'));
}

function* watchExerciseActions() {
  const {addItem, removeItem, createWatchPath} = createDatabaseSagas(getExercisePath);
  const watchUserExercises = createWatchPath(receiveExercises, ['user']);
  yield [
    takeEvery(ADD_EXERCISE, addItem),
    takeEvery(REMOVE_EXERCISE, removeItem),
    takeLatest(REQUEST_EXERCISES, loadExercises, watchUserExercises)
  ];
}

function* loadExercises(watchPath) {
  const exercises = yield call(fetchSystemExercises);
  yield put(receiveExercises(exercises, 'system'));
  yield fork(watchPath);
}

function fetchSystemExercises() {
  return getServices()
    .db
    .ref('/exercises')
    .once('value')
    .then(snapshot => snapshot.val());
}

function* watchExerciseTemplateActions() {
  const {addItem, removeItem, createWatchPath} = createDatabaseSagas(getExerciseTemplatePath);
  yield [
    takeEvery(ADD_EXERCISE_TEMPLATE, addItem),
    takeEvery(REMOVE_EXERCISE_TEMPLATE, removeItem),
    takeLatest(REQUEST_EXERCISE_TEMPLATES, createWatchPath(receiveExerciseTemplates))
  ];
}

function* watchWorkoutTemplateActions() {
  const {addItem, removeItem, createWatchPath} = createDatabaseSagas(getWorkoutTemplatePath);
  yield [
    takeEvery(ADD_WORKOUT_TEMPLATE, addItem),
    takeEvery(REMOVE_WORKOUT_TEMPLATE, removeItem),
    takeLatest(REQUEST_WORKOUT_TEMPLATES, createWatchPath(receiveWorkoutTemplates))
  ];
}

function* onLocationChange({payload}) {
  switch (payload.route) {
    case EXERCISE_LIST:
      yield put(requestExercises());
      break;

    case WORKOUT_TEMPLATE_EDIT:
    case WORKOUT_TEMPLATE_VIEW:
      yield put(requestWorkoutTemplates());

      const received = yield select((state) => state.workoutTemplate.received);
      if (!received) {
        yield take(RECEIVE_WORKOUT_TEMPLATES);
      }

      const workoutTemplate = yield select(getWorkoutTemplate);
      if (!workoutTemplate) {
        yield put(replace(NO_MATCH));
      }
      break;

    default:
  }
}
