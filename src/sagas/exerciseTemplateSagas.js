import createDatabaseSagas from '../helpers/createDatabaseSagas';
import {receiveExerciseTemplates} from '../actionCreators';
import {getExerciseTemplatePath} from '../helpers/selectors';

const exerciseTemplateSagas = createDatabaseSagas(getExerciseTemplatePath);

export const addExerciseTemplate = exerciseTemplateSagas.addItem;
export const removeExerciseTemplate = exerciseTemplateSagas.removeItem;
export const channelExerciseTemplates = exerciseTemplateSagas.createWatchPath(receiveExerciseTemplates);
