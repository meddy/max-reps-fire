import {RECEIVE_SIGN_IN, RECEIVE_SIGN_OUT} from '../actions';

const initialState = {
  authenticated: false,
  name: null
};

export default function reduceUserState(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_SIGN_IN:
      return Object.assign(newState, {
        authenticated: true,
        name: action.name
      });

    case RECEIVE_SIGN_OUT:
      return Object.assign(newState, {
        authenticated: false,
        name: null
      });

    default:
      return newState;
  }
}
