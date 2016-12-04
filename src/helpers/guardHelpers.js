export function createGuard(check, failRoutePath, store) {
  return (newRouteState, replace, cb) => {
    check(store, newRouteState.params).then(result => {
      if (!result) {
        replace(failRoutePath);
      }

      cb();
    });
  };
}

export function createStateCheck(createRequestAction, selectReady, selectCheck) {
  return (store, params) => {
    return new Promise(resolve => {
      const state = store.getState();
      if (selectReady(state, params)) {
        resolve(selectCheck(state, params));
        return;
      }

      store.dispatch(createRequestAction());

      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        if (selectReady(state, params)) {
          unsubscribe();
          resolve(selectCheck(state));
        }
      });
    });
  };
}

export function composeChecks(checks) {
  return store => {
    return Promise
      .all(checks.map(check => check(store)))
      .then(results => results.every(value => value));
  };
}
