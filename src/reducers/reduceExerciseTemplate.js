import {merge} from 'lodash/fp';
import {ADD_EXERCISE_TEMPLATE, RECEIVE_EXERCISE_TEMPLATES, RECEIVE_SIGN_OUT} from '../actionTypes';
import createReducer from '../helpers/createReducer';

const initialState = {
  selectedWorkoutTemplate: null,
  dataByWorkoutTemplate: {}
};

const actionMap = {
  [ADD_EXERCISE_TEMPLATE]: (state, action) => ({
    ...state,
    selectedWorkoutTemplate: action.workoutTemplate
  }),
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
