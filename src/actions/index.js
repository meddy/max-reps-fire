export const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN';
export const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT';
export const REQUEST_SIGN_OUT ='REQUEST_SIGN_OUT';

export function receiveSignIn(name) {
  return {type: RECEIVE_SIGN_IN, name};
}

export function receiveSignOut() {
  return {type: RECEIVE_SIGN_OUT};
}

export function requestSignOut() {
  return {type: REQUEST_SIGN_OUT};
}
