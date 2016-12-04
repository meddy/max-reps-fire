export const getUid = state => state.user.uid;
export const getAuthReceived = state => state.user.received;
export const getAuthenticated = state => state.user.authenticated;
export const getWorkoutTemplatesReceived = state => state.workoutTemplate.received;
export const getWorkoutTemplate = (state, params) => state.workoutTemplate.data[params.workoutTemplateId];