import {RECEIVE_SIGN_IN, RECEIVE_SIGN_OUT, TOUCH_AUTH} from '../actionTypes';

const initialState = {
  authChecked: false,
  authenticated: false,
  name: null,
  uid: null
};

export default function reduceUserState(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SIGN_IN:
      return {
        ...state,
        authChecked: true,
        authenticated: true,
        name: action.name,
        uid: action.uid
      };

    case RECEIVE_SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        name: null,
        uid: null
      };

    case TOUCH_AUTH:
      return {
        ...state,
        authChecked: true
      };

    default:
      return state;
  }
}
