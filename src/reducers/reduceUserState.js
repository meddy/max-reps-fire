import {types} from '../actions';

const initialState = {
  authStateChecked: false,
  authenticated: false,
  name: null
};

export default function reduceUserState(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case types.RECEIVE_SIGN_IN:
      return Object.assign(newState, {
        authStateChecked: true,
        authenticated: true,
        name: action.name
      });

    case types.RECEIVE_SIGN_OUT:
      return Object.assign(newState, {
        authenticated: false,
        name: null
      });

    case types.TOUCH_AUTH:
      return Object.assign(newState, {
        authStateChecked: true
      });

    default:
      return newState;
  }
}
