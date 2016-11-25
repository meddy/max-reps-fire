export default function createRedirectToSignIn(store) {
  return (newRouteState, replace, cb) => {
    waitForAuthCheck(store).then(() => {
      if (!store.getState().user.authenticated) {
        replace('/');
      }

      cb();
    });
  };
}

function waitForAuthCheck(store) {
  return new Promise(resolve => {
    if (store.getState().user.authChecked) {
      resolve();
    }

    store.subscribe(() => {
      if (store.getState().user.authChecked) {
        resolve();
      }
    });
  });
}
