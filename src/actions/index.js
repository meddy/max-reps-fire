export const types = {
  RECEIVE_EXERCISES: 'RECEIVE_EXERCISES',
  RECEIVE_SIGN_IN: 'RECEIVE_SIGN_IN',
  RECEIVE_SIGN_OUT: 'RECEIVE_SIGN_OUT',
  REQUEST_EXERCISES: 'REQUEST_EXERCISES',
  REQUEST_SIGN_IN: 'REQUEST_SIGN_IN',
  REQUEST_SIGN_OUT: 'REQUEST_SIGN_OUT',
  TOUCH_AUTH: 'TOUCH_AUTH'
};

export default {
  receiveExercises: (system, user) => ({type: types.RECEIVE_EXERCISES, system, user}),
  receiveSignIn: name => ({type: types.RECEIVE_SIGN_IN, name}),
  receiveSignOut: () => ({type: types.RECEIVE_SIGN_OUT}),
  requestExercises: () => ({type: types.REQUEST_EXERCISES}),
  requestSignIn: () => ({type: types.REQUEST_SIGN_IN}),
  requestSignOut: () => ({type: types.REQUEST_SIGN_OUT}),
  touchAuth: () => ({type: types.TOUCH_AUTH}),
};
