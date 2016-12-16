import {takeLatest} from 'redux-saga';
import {call, take} from 'redux-saga/effects';
import {
  ADD_EXERCISE,
  ADD_EXERCISE_TEMPLATE,
  ADD_WORKOUT_TEMPLATE,
  REMOVE_EXERCISE,
  REMOVE_WORKOUT_TEMPLATE,
  REQUEST_EXERCISES,
  REQUEST_SIGN_IN,
  REQUEST_WORKOUT_TEMPLATES
} from '../actions/types';
import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';
import {addExerciseTemplate} from './exerciseTemplateSagas';
import {addWorkoutTemplate, channelWorkoutTemplates, removeWorkoutTemplate} from './workoutTemplateSagas';

export default function* combineSagas() {
  return yield [
    watchAuth(),
    watchAddExercise(),
    watchAddExerciseTemplate(),
    watchAddWorkoutTemplate(),
    watchRemoveExercise(),
    watchRemoveWorkoutTemplate(),
    watchRequestExercises(),
    watchRequestWorkoutTemplates()
  ];
}

function* watchAuth() {
  while (true) {
    yield take(REQUEST_SIGN_IN);
    yield call(handleAuthFlow);
  }
}

function* watchAddExercise() {
  yield takeLatest(ADD_EXERCISE, addExercise);
}

function* watchRemoveExercise() {
  yield takeLatest(REMOVE_EXERCISE, removeExercise);
}

function* watchRequestExercises() {
  yield takeLatest(REQUEST_EXERCISES, fetchExercises);
}

function* watchAddExerciseTemplate() {
  yield takeLatest(ADD_EXERCISE_TEMPLATE, addExerciseTemplate);
}

function* watchAddWorkoutTemplate() {
  yield takeLatest(ADD_WORKOUT_TEMPLATE, addWorkoutTemplate);
}

function* watchRemoveWorkoutTemplate() {
  yield takeLatest(REMOVE_WORKOUT_TEMPLATE, removeWorkoutTemplate);
}

function* watchRequestWorkoutTemplates() {
  yield takeLatest(REQUEST_WORKOUT_TEMPLATES, channelWorkoutTemplates);
}
