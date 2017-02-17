import {receiveWorkoutTemplates} from '../actionCreators';
import createDatabaseSagas from '../helpers/createDatabaseSagas';
import {getWorkoutTemplatePath} from '../helpers/selectors';

const workoutTemplateSagas = createDatabaseSagas(getWorkoutTemplatePath);

export const channelWorkoutTemplates = workoutTemplateSagas.createWatchPath(receiveWorkoutTemplates);
export const addWorkoutTemplate = workoutTemplateSagas.addItem;
export const removeWorkoutTemplate = workoutTemplateSagas.removeItem;
