import {cloneDeep, merge, set} from 'lodash/fp';
import {handleActions} from 'redux-actions';
import * as actions from './actions';

const initialState = {
  exercise: {
    user: {},
    system: {}
  },
  exerciseTemplate: {
    selectedWorkoutTemplate: null,
    dataByWorkoutTemplate: {}
  },
  user: {
    authenticated: false,
    name: null,
    uid: null
  },
  workoutTemplate: {
    data: {}
  }
};

export default handleActions({
  [actions.RECEIVE_EXERCISES](state, {payload: {source, exercises}}) {
    return set(`exercises.${source}`, exercises, state);3
  },
  [actions.REQUEST_SIGN_OUT]() {
    return cloneDeep(initialState)
  },
  [actions.ADD_EXERCISE_TEMPLATE](state, {payload: {workoutTemplate}}) {
    return set(`exerciseTemplate.selected`, workoutTemplate, state);
  },
  [actions.RECEIVE_EXERCISE_TEMPLATES](state, {payload}) {
    return merge(state.exerciseTemplate, {dataByWorkoutTemplate: payload})
  },
  [actions.RECEIVE_SIGN_IN](state, {payload: {name, uid}}) {
    // got rid of received, because i don't think we need it
    return {
      ...state,
      user: {
        authenticated: true,
        name,
        uid
      }
    }
  },
  [actions.RECEIVE_SIGN_OUT](state) {
    return set('user', {...initialState.user}, state);
  },
  [actions.TOUCH_AUTH](state, action) {
    // might not need this if we switch to saga based routing
    return state;
  },
  [actions.RECEIVE_WORKOUT_TEMPLATES](state, {payload}) {
    return merge(state.workoutTemplate, {data: payload});
  }
});