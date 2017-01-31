import {createSelector} from 'reselect'

export const getUid = state => state.user.uid;
export const getAuthReceived = state => state.user.received;
export const getAuthenticated = state => state.user.authenticated;
export const getWorkoutTemplatesReceived = state => state.workoutTemplate.received;
export const getWorkoutTemplateNames = state => Object.keys(state.workoutTemplate.data);

export const getWorkoutTemplate = (state, props) => {
  const {workoutTemplateKey} = props.params;
  return state.workoutTemplate.data[workoutTemplateKey];
};

export const getExerciseOptions = createSelector(
  state => state.exercise,
  exerciseState => {
    return Object
      .keys(exerciseState.system)
      .concat(Object.keys(exerciseState.user))
      .sort()
      .map(exercise => ({value: exercise, label: exercise}));
  }
);

export const getExerciseTemplates = createSelector(
  (state, workoutTemplateKey) => state.exerciseTemplate.dataByWorkoutTemplate[workoutTemplateKey] || {},
  exerciseTemplates => {
    return Object
      .keys(exerciseTemplates)
      .map(key => ({key, ...exerciseTemplates[key]}))
      .sort((a, b) => a - b);
  }
);

export const getExercisePath = createSelector(getUid, uid => `/users/${uid}/exercises`);
export const getExerciseTemplatePath = createSelector(getUid, uid => `/users/${uid}/exerciseTemplates`);
export const getWorkoutTemplatePath = createSelector(getUid, uid => `/users/${uid}/workoutTemplates`);
