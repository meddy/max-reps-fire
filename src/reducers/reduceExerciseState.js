import {RECEIVE_EXERCISES} from '../actionTypes';

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

    default:
      return state;
  }
}
