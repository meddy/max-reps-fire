import createDatabaseSagas from '../helpers/createDatabaseSagas';
import {receiveExerciseTemplates} from '../actions/creators';
import {getExerciseTemplatePath} from '../helpers/selectors';

const exerciseTemplateSagas = createDatabaseSagas(getExerciseTemplatePath);

export const addExerciseTemplate = exerciseTemplateSagas.addItem;
export const removeExerciseTemplate = exerciseTemplateSagas.removeItem;
export const channelExerciseTemplates = exerciseTemplateSagas.createWatchPath(receiveExerciseTemplates);
