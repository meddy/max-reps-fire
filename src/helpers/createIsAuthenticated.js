export default function createIsAuthenticated(getState) {
  return (newRouteState, replace) => {
    const isAuthenticated = getState().user.data;
    if (!isAuthenticated) {
      replace('/sign-in');
    }
  }
}
