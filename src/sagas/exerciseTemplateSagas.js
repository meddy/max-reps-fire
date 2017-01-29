import createDatabaseSagas from '../helpers/createDatabaseSagas';
import {getExerciseTemplatePath} from '../helpers/selectors';

const exerciseTemplateSagas = createDatabaseSagas(getExerciseTemplatePath);

export const addExerciseTemplate = exerciseTemplateSagas.addItem;
