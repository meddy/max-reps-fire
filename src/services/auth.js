function requireAuth(nextState, replace, cb) {
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (!result.user) {
        replace('/sign-in');
      }
      cb();
    })
    .catch(err => {
      replace('/error');
      cb(err);
    });
}