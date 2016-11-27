import {RECEIVE_WORKOUT_TEMPLATES} from '../actionTypes';

const initialState = {};

export default function reduceWorkoutTemplateState(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_WORKOUT_TEMPLATES:
      return {
        ...state,
        ...action.workoutTemplates
      };

    default:
      return state;
  }
}
