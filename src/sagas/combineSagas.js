import {takeEvery, takeLatest} from 'redux-saga/effects';
import {
  ADD_EXERCISE,
  ADD_EXERCISE_TEMPLATE,
  ADD_WORKOUT_TEMPLATE,
  REMOVE_EXERCISE,
  REMOVE_WORKOUT_TEMPLATE,
  REQUEST_EXERCISES,
  REQUEST_EXERCISE_TEMPLATES,
  REQUEST_SIGN_IN,
  REQUEST_WORKOUT_TEMPLATES
} from '../actions/types';
import {handleAuthFlow} from './authSagas';
import {addExercise, fetchExercises, removeExercise} from './exerciseSagas';
import {addExerciseTemplate, channelExerciseTemplates} from './exerciseTemplateSagas';
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
    watchRequestExerciseTemplates(),
    watchRequestWorkoutTemplates()
  ];
}

function* watchAuth() {
  yield takeLatest(REQUEST_SIGN_IN, handleAuthFlow);
}

function* watchAddExercise() {
  yield takeEvery(ADD_EXERCISE, addExercise);
}

function* watchRemoveExercise() {
  yield takeEvery(REMOVE_EXERCISE, removeExercise);
}

function* watchRequestExercises() {
  yield takeLatest(REQUEST_EXERCISES, fetchExercises);
}

function* watchAddExerciseTemplate() {
  yield takeEvery(ADD_EXERCISE_TEMPLATE, addExerciseTemplate);
}

function* watchRequestExerciseTemplates() {
  yield takeLatest(REQUEST_EXERCISE_TEMPLATES, channelExerciseTemplates);
}

function* watchAddWorkoutTemplate() {
  yield takeEvery(ADD_WORKOUT_TEMPLATE, addWorkoutTemplate);
}

function* watchRemoveWorkoutTemplate() {
  yield takeEvery(REMOVE_WORKOUT_TEMPLATE, removeWorkoutTemplate);
}

function* watchRequestWorkoutTemplates() {
  yield takeLatest(REQUEST_WORKOUT_TEMPLATES, channelWorkoutTemplates);
}
