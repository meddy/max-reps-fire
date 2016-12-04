import {RECEIVE_EXERCISES, REQUEST_SIGN_OUT} from '../actionTypes';

const initialState = {
  user: {},
  system: {}
};

export default function reduceExerciseState(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_EXERCISES:
      return {
        ...state,
        [action.source]: action.exercises
      };

    case REQUEST_SIGN_OUT:
      return initialState;

    default:
      return state;
  }
}
