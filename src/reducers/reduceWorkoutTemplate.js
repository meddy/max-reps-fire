import {RECEIVE_WORKOUT_TEMPLATES, RECEIVE_SIGN_OUT} from '../actions/types';

const initialState = {
  data: {},
  received: false
};

export default function reduceWorkoutTemplate(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_WORKOUT_TEMPLATES:
      return {
        data: action.workoutTemplates,
        received: true
      };

    case RECEIVE_SIGN_OUT:
      return initialState;

    default:
      return state;
  }
}
