export default function createGuard(check, failRoutePath, store) {
  return (newRouteState, replace, cb) => {
    check(store).then(result => {
      if (!result) {
        replace(failRoutePath);
      }

      cb();
    });
  };
}
