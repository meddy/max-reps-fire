import {createAddItem} from '../helpers/sagaHelpers';
import {getExerciseTemplatePath} from '../helpers/selectors';

export const addExerciseTemplate = createAddItem(getExerciseTemplatePath);
