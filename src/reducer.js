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
  navigation: {
    path: null,
    name: null,
    params: {}
  },
  user: {
    authenticated: false,
    authChecked: false,
    name: null,
    uid: null
  },
  workoutTemplate: {
    data: {}
  }
};

const reducerMap = {
  [actions.RECEIVE_EXERCISES](state, {payload: {source, exercises}}) {
    console.log(state);
    console.log(set(`exercises.${source}`, exercises, state));
    return set(`exercises.${source}`, exercises, state);
  },
  [actions.REQUEST_SIGN_OUT]() {
    return cloneDeep(initialState);
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
        authChecked: true,
        name,
        uid
      }
    };
  },
  [actions.RECEIVE_SIGN_OUT](state) {
    return set('user', {...initialState.user}, state);
  },
  [actions.RECEIVE_WORKOUT_TEMPLATES](state, {payload}) {
    return merge(state.workoutTemplate, {data: payload});
  }
};

export default handleActions(reducerMap, initialState);
