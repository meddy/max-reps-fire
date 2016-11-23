import {types} from '../actions';

const initialState = {
  authStateChecked: false,
  authenticated: false,
  name: null,
  uid: null
};

export default function reduceUserState(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_SIGN_IN:
      return {
        ...state,
        authStateChecked: true,
        authenticated: true,
        name: action.name,
        uid: action.uid
      };

    case types.RECEIVE_SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        name: null,
        uid: null
      };

    case types.TOUCH_AUTH:
      return {
        ...state,
        authStateChecked: true
      };

    default:
      return state;
  }
}
