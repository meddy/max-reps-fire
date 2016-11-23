export const types = {
  CREATE_EXERCISE: 'CREATE_EXERCISE',
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
  receiveExercises: (system, user) => ({type: types.RECEIVE_EXERCISES, system, user}),
  receiveSignIn: (name, uid) => ({type: types.RECEIVE_SIGN_IN, name, uid}),
  receiveSignOut: () => ({type: types.RECEIVE_SIGN_OUT}),
  requestExercises: () => ({type: types.REQUEST_EXERCISES}),
  requestSignIn: () => ({type: types.REQUEST_SIGN_IN}),
  requestSignOut: () => ({type: types.REQUEST_SIGN_OUT}),
  touchAuth: () => ({type: types.TOUCH_AUTH}),
};
