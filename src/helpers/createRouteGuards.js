import {requestSignIn, requestWorkoutTemplates} from '../actions';
import {getAuthReceived, getAuthenticated, getWorkoutTemplatesReceived, getWorkoutTemplate} from '../helpers/selectors';

// need to translate this to sagas
export default function createRouteGuards(store) {
  const isAuthenticated = createStateCheck(
    requestSignIn,
    getAuthReceived,
    getAuthenticated
  );

  const workoutTemplateExists = createStateCheck(
    requestWorkoutTemplates,
    getWorkoutTemplatesReceived,
    getWorkoutTemplate
  );

  return {
    auth: createGuard(isAuthenticated, '/'),
    workoutTemplate: createGuard(workoutTemplateExists, '/no-match')
  };

  function createGuard(check, failRoutePath) {
    return (newRouteState, replace, cb) => {
      check(store, newRouteState).then(result => {
        if (!result) {
          replace(failRoutePath);
        }

        cb();
      });
    };
  }
};

export function createStateCheck(createRequestAction, selectReady, selectCheck) {
  return (store, routeState) => {
    return new Promise(resolve => {
      const storeState = store.getState();
      if (selectReady(storeState, routeState)) {
        resolve(selectCheck(storeState, routeState));
        return;
      }

      store.dispatch(createRequestAction());

      const unsubscribe = store.subscribe(() => {
        const storeState = store.getState();
        if (selectReady(storeState, routeState)) {
          unsubscribe();
          resolve(selectCheck(storeState, routeState));
        }
      });
    });
  };
}