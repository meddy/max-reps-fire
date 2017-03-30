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
  [actions.RECEIVE_AUTH_RESPONSE](state, {payload}) {
    if (!payload) {
      return set('user.authChecked', true, state);
    }

    return {
      ...state,
      user: {
        authenticated: true,
        authChecked: true,
        name: payload.displayName,
        uid: payload.uid
      }
    };
  },
  [actions.RECEIVE_EXERCISE_TEMPLATES](state, {payload}) {
    return merge(state.exerciseTemplate, {dataByWorkoutTemplate: payload});
  },
  [actions.RECEIVE_SIGN_OUT](state) {
    return set('user', {...initialState.user}, state);
  },
  [actions.RECEIVE_WORKOUT_TEMPLATES](state, {payload}) {
    return merge(state.workoutTemplate, {data: payload});
  }
};

export default handleActions(reducerMap, initialState);
