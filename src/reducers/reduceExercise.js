import {RECEIVE_EXERCISES, REQUEST_SIGN_OUT} from '../actions/types';
import createReducer from '../helpers/createReducer';

const initialState = {
  user: {},
  system: {}
};

const actionMap = {
  [RECEIVE_EXERCISES]: (state, action) => ({...state, [action.source]: action.exercises}),
  [REQUEST_SIGN_OUT]: () => ({...initialState})
};

export default createReducer(initialState, actionMap);
