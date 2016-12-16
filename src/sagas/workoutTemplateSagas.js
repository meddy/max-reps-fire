import {receiveWorkoutTemplates} from '../actions/creators';
import {createAddItem, createRemoveItem, createWatchPath} from '../helpers/sagaHelpers';

const pathName = 'workoutTemplates';

export const channelWorkoutTemplates = createWatchPath(pathName, receiveWorkoutTemplates);
export const addWorkoutTemplate = createAddItem(pathName);
export const removeWorkoutTemplate = createRemoveItem(pathName);
