import {RECEIVE_WORKOUT_TEMPLATES, RECEIVE_SIGN_OUT} from '../actionTypes';

const initialState = {
  received: false,
  data: {}
};

export default function reduceWorkoutTemplateState(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_WORKOUT_TEMPLATES:
      return {
        received: true,
        data: action.workoutTemplates
      };

    case RECEIVE_SIGN_OUT:
      return initialState;

    default:
      return state;
  }
}
