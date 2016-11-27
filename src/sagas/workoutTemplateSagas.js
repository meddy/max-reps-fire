import {receiveWorkoutTemplates} from '../actionCreators';
import {createWatchPath} from '../helpers/sagaHelpers';

const pathName = 'workoutTemplates';
export const channelWorkoutTemplates = createWatchPath(pathName, receiveWorkoutTemplates);
