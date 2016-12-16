import {createAddItem} from '../helpers/sagaHelpers';
import {getExerciseTemplatePath} from '../selectors';

export const addExerciseTemplate = createAddItem(getExerciseTemplatePath);