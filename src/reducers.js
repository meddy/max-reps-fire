import {cloneDeep, flow, merge, set} from 'lodash/fp';
import {
  ADD_EXERCISE_TEMPLATE,
  ADD_WORKOUT_TEMPLATE,
  RECEIVE_AUTH,
  RECEIVE_EXERCISES,
  RECEIVE_EXERCISE_TEMPLATES,
  RECEIVE_WORKOUT_TEMPLATES,
  SIGN_OUT
} from './actions';
import {createReducer} from './helpers/reducerHelpers';

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
    authChecked: false,
    name: null,
    uid: null
  },
  workoutTemplate: {
    received: false,
    data: {}
  }
};

export const reduceExercise = createReducer(initialState.exercise, {
  [RECEIVE_EXERCISES](state, {source, exercises}) {
    return set(source, exercises, state);
  }
});

export const reduceExerciseTemplate = createReducer(initialState.exerciseTemplate, {
  [ADD_EXERCISE_TEMPLATE](state, {workoutTemplate}) {
    return set('selected', workoutTemplate, state);
  },
  [RECEIVE_EXERCISE_TEMPLATES](state, {payload}) {
    return merge(state, {dataByWorkoutTemplate: payload});
  }
});

export const reduceUser = createReducer(initialState.user, {
  [RECEIVE_AUTH](state, {user}) {
    if (!user) {
      return set('authChecked', true, state);
    }

    return {
      ...state,
      authenticated: true,
      authChecked: true,
      name: user.displayName,
      uid: user.uid
    };
  },
  [SIGN_OUT]() {
    return flow(
      cloneDeep,
      set('authChecked', true)
    )(initialState);
  }
});

export const reduceWorkoutTemplate = createReducer(initialState.workoutTemplate, {
  [ADD_WORKOUT_TEMPLATE](state) {
    return set('received', false, state);
  },
  [RECEIVE_WORKOUT_TEMPLATES](state, {workoutTemplates}) {
    return flow(
      set('data', workoutTemplates),
      set('received', true)
    )(state);
  }
});
