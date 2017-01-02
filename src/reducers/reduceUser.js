import {RECEIVE_SIGN_IN, RECEIVE_SIGN_OUT, TOUCH_AUTH} from '../actions/types';
import createReducer from '../helpers/createReducer';

const initialState = {
  authenticated: false,
  name: null,
  received: false,
  uid: null
};

const actionMap = {
  [RECEIVE_SIGN_IN]: (state, action) => {
    return {
      ...state,
      authenticated: true,
      name: action.name,
      received: true,
      uid: action.uid
    };
  },
  [RECEIVE_SIGN_OUT]: state => {
    return {
      ...state,
      authenticated: false,
      name: null,
      uid: null
    };
  },
  [TOUCH_AUTH]: state => ({...state, received: true})
};

export default createReducer(initialState, actionMap);
