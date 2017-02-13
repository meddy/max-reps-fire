import {RECEIVE_WORKOUT_TEMPLATES, RECEIVE_SIGN_OUT} from '../actions/types';
import createReducer from '../helpers/createReducer';

const initialState = {
  data: {},
  received: false
};

const actionMap = {
  [RECEIVE_WORKOUT_TEMPLATES]: (state, action) => ({
    ...state,
    data: action.workoutTemplates,
    received: true
  }),
  [RECEIVE_SIGN_OUT]: () => ({...initialState})
};

export default createReducer(initialState, actionMap);
