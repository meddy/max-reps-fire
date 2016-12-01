import {RECEIVE_WORKOUT_TEMPLATES} from '../actionTypes';

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

    default:
      return state;
  }
}
