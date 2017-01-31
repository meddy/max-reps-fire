import {merge} from 'lodash/fp';
import {RECEIVE_EXERCISE_TEMPLATES, RECEIVE_SIGN_OUT} from '../actions/types';
import createReducer from '../helpers/createReducer';

const initialState = {
  dataByWorkoutTemplate: {}
};

const actionMap = {
  [RECEIVE_EXERCISE_TEMPLATES]: (state, action) => {
    return merge(state, {
      dataByWorkoutTemplate: {
        ...action.exerciseTemplatesGrouped
      }
    });
  },
  [RECEIVE_SIGN_OUT]: () => ({...initialState})
};

export default createReducer(initialState, actionMap);
