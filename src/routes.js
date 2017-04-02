import UrlPattern from 'url-pattern';

export const HOME = '/';
export const EXERCISE_LIST = '/exercises';
export const NO_MATCH = '/no-match';
export const WORKOUT_LIST = '/workouts';
export const WORKOUT_TEMPLATE_VIEW = '/workout-template/:workoutTemplate';
export const WORKOUT_TEMPLATE_EDIT = '/workout-template/:workoutTemplate/edit';

export const routeMap = {
  [HOME]: {},
  [EXERCISE_LIST]: {},
  [NO_MATCH]: {},
  [WORKOUT_LIST]: {},
  [WORKOUT_TEMPLATE_VIEW]: {},
  [WORKOUT_TEMPLATE_EDIT]: {},
};

export function createPathname(pattern, params = {}) {
  try {
    return (new UrlPattern(pattern)).stringify(params);
  } catch (err) {
    return null;
  }
}
