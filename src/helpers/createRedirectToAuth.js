export default function createRedirectToAuth(getState) {
  return (newRouteState, replace) => {
    if (!getState().user.authenticated) {
      replace('/');
    }
  };
}
