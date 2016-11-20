export const types = {
  RECEIVE_SIGN_IN: 'RECEIVE_SIGN_IN',
  RECEIVE_SIGN_OUT: 'RECEIVE_SIGN_OUT',
  REQUEST_SIGN_IN: 'REQUEST_SIGN_IN',
  REQUEST_SIGN_OUT: 'REQUEST_SIGN_OUT',
  TOUCH_AUTH: 'TOUCH_AUTH'
};

export default {
  receiveSignIn: (name) => ({type: types.RECEIVE_SIGN_IN, name}),
  receiveSignOut: () => ({type: types.RECEIVE_SIGN_OUT}),
  requestSignIn: () => ({type: types.REQUEST_SIGN_IN}),
  requestSignOut: () => ({type: types.REQUEST_SIGN_OUT}),
  touchAuth: () => ({type: types.TOUCH_AUTH}),
};
