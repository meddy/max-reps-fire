import {types} from '../actions';

const initialState = {
  user: {},
  system: {}
};

export default function reduceExerciseState(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_EXERCISES:
      return {
        ...state,
        system: action.system
      };

    default:
      return state;
  }
}
