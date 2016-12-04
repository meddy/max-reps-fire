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
          resolve(selectCheck(state, params));
        }
      });
    });
  };
}

export function composeChecks(checks) {
  return (store, params) => {
    return checks.reduce(
      (promise, check) => promise.then(() => check(store, params)),
      Promise.resolve()
    );
  };
}
