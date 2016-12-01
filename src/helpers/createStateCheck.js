export default function createStateCheck(createRequestAction, selectReady, selectCheck) {
  return store => {
    return new Promise(resolve => {
      const state = store.getState();
      if (selectReady(state)) {
        resolve(selectCheck(state));
        return;
      }

      store.dispatch(createRequestAction());

      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        if (selectReady(state)) {
          unsubscribe();
          resolve(selectCheck(state));
        }
      });
    });
  };
}
