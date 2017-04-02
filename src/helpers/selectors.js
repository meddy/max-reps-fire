import {createSelector} from 'reselect'

export const getUid = state => state.user.uid;
export const getAuthChecked = state => state.user.authChecked;
export const getAuthenticated = state => state.user.authenticated;

export const getWorkoutTemplatesReceived = state => state.workoutTemplate.received;
export const getWorkoutTemplateNames = state => Object.keys(state.workoutTemplate.data);

export const getWorkoutTemplate = (state) => {
  const {workoutTemplate} = state.router.params;
  return state.workoutTemplate.data[workoutTemplate];
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
  (state, workoutTemplate) => state.exerciseTemplate.dataByWorkoutTemplate[workoutTemplate] || {},
  exerciseTemplates => {
    return Object
      .keys(exerciseTemplates)
      .map(key => ({key, ...exerciseTemplates[key]}))
      .sort((a, b) => a - b);
  }
);

export const getExercisePath = createSelector(getUid, uid => `/users/${uid}/exercises`);
export const getWorkoutTemplatePath = createSelector(getUid, uid => `/users/${uid}/workoutTemplates`);
export const getExerciseTemplatePath = createSelector(
  getUid,
  state => state.exerciseTemplate.selectedWorkoutTemplate,
  (uid, workoutTemplate) => {
    const path = `/users/${uid}/exerciseTemplates`;
    return workoutTemplate ? `${path}/${workoutTemplate}` : path;
  }
);
