import {RECEIVE_SIGN_IN, RECEIVE_SIGN_OUT, TOUCH_AUTH} from '../actionTypes';

const initialState = {
  authenticated: false,
  name: null,
  received: false,
  uid: null
};

export default function reduceUserState(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SIGN_IN:
      return {
        ...state,
        authenticated: true,
        name: action.name,
        received: true,
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
        received: true
      };

    default:
      return state;
  }
}
