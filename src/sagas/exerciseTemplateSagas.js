import {createAddItem} from '../helpers/sagaHelpers';

const pathName = 'exerciseTemplates';
export const addExerciseTemplate = createAddItem(pathName);