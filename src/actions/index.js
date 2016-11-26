export const types = {
  CREATE_EXERCISE: 'CREATE_EXERCISE',
  CREATE_WORKOUT_TEMPLATE: 'CREATE_WORKOUT_TEMPLATE',
  DELETE_EXERCISE: 'DELETE_EXERCISE',
  RECEIVE_EXERCISES: 'RECEIVE_EXERCISES',
  RECEIVE_SIGN_IN: 'RECEIVE_SIGN_IN',
  RECEIVE_SIGN_OUT: 'RECEIVE_SIGN_OUT',
  REQUEST_EXERCISES: 'REQUEST_EXERCISES',
  REQUEST_SIGN_IN: 'REQUEST_SIGN_IN',
  REQUEST_SIGN_OUT: 'REQUEST_SIGN_OUT',
  TOUCH_AUTH: 'TOUCH_AUTH'
};

export default {
  createExercise: name => ({type: types.CREATE_EXERCISE, name}),
  createWorkoutTemplate: name => ({type: types.CREATE_WORKOUT_TEMPLATE, name}),
  deleteExercise: name => ({type: types.DELETE_EXERCISE, name}),
  receiveExercises: (exercises, source) => ({type: types.RECEIVE_EXERCISES, exercises, source}),
  receiveSignIn: (name, uid) => ({type: types.RECEIVE_SIGN_IN, name, uid}),
  receiveSignOut: () => ({type: types.RECEIVE_SIGN_OUT}),
  requestExercises: () => ({type: types.REQUEST_EXERCISES}),
  requestSignIn: () => ({type: types.REQUEST_SIGN_IN}),
  requestSignOut: () => ({type: types.REQUEST_SIGN_OUT}),
  touchAuth: () => ({type: types.TOUCH_AUTH}),
};
