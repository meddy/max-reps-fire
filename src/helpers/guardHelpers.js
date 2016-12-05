export function createGuard(check, failRoutePath, store) {
  return (newRouteState, replace, cb) => {
    check(store, newRouteState).then(result => {
      if (!result) {
        replace(failRoutePath);
      }

      cb();
    });
  };
}

export function createStateCheck(createRequestAction, selectReady, selectCheck) {
  return (store, localState) => {
    return new Promise(resolve => {
      const state = store.getState();
      if (selectReady(state, localState)) {
        resolve(selectCheck(state, localState));
        return;
      }

      store.dispatch(createRequestAction());

      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        if (selectReady(state, localState)) {
          unsubscribe();
          resolve(selectCheck(state, localState));
        }
      });
    });
  };
}

export function composeChecks(checks) {
  return (store, localState) => {
    return checks.reduce(
      (promise, check) => promise.then(() => check(store, localState)),
      Promise.resolve()
    );
  };
}
