import {takeEvery, takeLatest} from 'redux-saga/effects';
import {
  ADD_EXERCISE,
  ADD_EXERCISE_TEMPLATE,
  ADD_WORKOUT_TEMPLATE,
  REMOVE_EXERCISE,
  REMOVE_EXERCISE_TEMPLATE,
  REMOVE_WORKOUT_TEMPLATE,
  REQUEST_EXERCISES,
  REQUEST_EXERCISE_TEMPLATES,
  REQUEST_SIGN_IN,
  REQUEST_WORKOUT_TEMPLATES
} from '../actions';
import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';
import {addExerciseTemplate, channelExerciseTemplates, removeExerciseTemplate} from './exerciseTemplateSagas';
import {addWorkoutTemplate, channelWorkoutTemplates, removeWorkoutTemplate} from './workoutTemplateSagas';

export default function* combineSagas() {
  // on startup we want to check auth
  // if authed
  // get workout templates
  // now app container is ready
  // resolve router
  // update state with navigation

  return yield [
    watchAuth(),
    watchAddExercise(),
    watchAddExerciseTemplate(),
    watchAddWorkoutTemplate(),
    watchRemoveExercise(),
    watchRemoveWorkoutTemplate(),
    watchRequestExercises(),
    watchRequestExerciseTemplates(),
    watchRemoveExerciseTemplate(),
    watchRequestWorkoutTemplates()
  ];
}

function* watchAuth() {
  yield takeLatest(REQUEST_SIGN_IN, handleAuthFlow);
}

function* watchAddExercise() {
  yield takeEvery(ADD_EXERCISE, addExercise);
}

function* watchAddExerciseTemplate() {
  yield takeEvery(ADD_EXERCISE_TEMPLATE, addExerciseTemplate);
}

function* watchAddWorkoutTemplate() {
  yield takeEvery(ADD_WORKOUT_TEMPLATE, addWorkoutTemplate);
}

function* watchRemoveExercise() {
  yield takeEvery(REMOVE_EXERCISE, removeExercise);
}

function* watchRemoveExerciseTemplate() {
  yield takeEvery(REMOVE_EXERCISE_TEMPLATE, removeExerciseTemplate);
}
function* watchRemoveWorkoutTemplate() {
  yield takeEvery(REMOVE_WORKOUT_TEMPLATE, removeWorkoutTemplate);
}

function* watchRequestExercises() {
  yield takeLatest(REQUEST_EXERCISES, fetchExercises);
}

function* watchRequestExerciseTemplates() {
  yield takeLatest(REQUEST_EXERCISE_TEMPLATES, channelExerciseTemplates);
}

function* watchRequestWorkoutTemplates() {
  yield takeLatest(REQUEST_WORKOUT_TEMPLATES, channelWorkoutTemplates);
}
