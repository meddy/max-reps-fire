export const types = {
  ADD_EXERCISE: 'ADD_EXERCISE',
  ADD_WORKOUT_TEMPLATE: 'ADD_WORKOUT_TEMPLATE',
  REMOVE_EXERCISE: 'REMOVE_EXERCISE',
  RECEIVE_EXERCISES: 'RECEIVE_EXERCISES',
  RECEIVE_SIGN_IN: 'RECEIVE_SIGN_IN',
  RECEIVE_SIGN_OUT: 'RECEIVE_SIGN_OUT',
  RECEIVE_WORKOUT_TEMPLATES: 'RECEIVE_WORKOUT_TEMPLATES',
  REQUEST_EXERCISES: 'REQUEST_EXERCISES',
  REQUEST_SIGN_IN: 'REQUEST_SIGN_IN',
  REQUEST_SIGN_OUT: 'REQUEST_SIGN_OUT',
  REQUEST_WORKOUT_TEMPLATES: 'REQUEST_WORKOUT_TEMPLATES',
  TOUCH_AUTH: 'TOUCH_AUTH'
};

export default {
  createExercise: name => ({type: types.ADD_EXERCISE, key: name, value: name}),
  createWorkoutTemplate: workoutTemplate => {
    return {
      type: types.ADD_WORKOUT_TEMPLATE,
      key: workoutTemplate.name,
      value: workoutTemplate
    };
  },
  deleteExercise: name => ({type: types.REMOVE_EXERCISE, key: name}),
  receiveExercises: (exercises, source) => ({type: types.RECEIVE_EXERCISES, exercises, source}),
  receiveSignIn: (name, uid) => ({type: types.RECEIVE_SIGN_IN, name, uid}),
  receiveSignOut: () => ({type: types.RECEIVE_SIGN_OUT}),
  receiveWorkoutTemplates: workoutTemplates => ({type: types.RECEIVE_WORKOUT_TEMPLATES, workoutTemplates}),
  requestExercises: () => ({type: types.REQUEST_EXERCISES}),
  requestSignIn: () => ({type: types.REQUEST_SIGN_IN}),
  requestSignOut: () => ({type: types.REQUEST_SIGN_OUT}),
  requestWorkoutTemplates: () => ({type: types.REQUEST_WORKOUT_TEMPLATES}),
  touchAuth: () => ({type: types.TOUCH_AUTH}),
};
