export default function createIsAuthenticated(getState) {
  return (newState, replace) => {
    const isAuthenticated = getState().user.data;
    if (!isAuthenticated) {
      // request sign in
      replace('/sign-in');
    }
  }
}
