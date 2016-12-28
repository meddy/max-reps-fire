import {receiveWorkoutTemplates} from '../actions/creators';
import {createAddItem, createRemoveItem, createWatchPath} from '../helpers/sagaHelpers';
import {getWorkoutTemplatePath} from '../helpers/selectors';

export const channelWorkoutTemplates = createWatchPath(
  getWorkoutTemplatePath,
  receiveWorkoutTemplates
);

export const addWorkoutTemplate = createAddItem(getWorkoutTemplatePath);
export const removeWorkoutTemplate = createRemoveItem(getWorkoutTemplatePath);
