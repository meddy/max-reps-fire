const initialState = {
  user: null
};

export default function reduceUserState(state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return Object.assign(newState, {user: action.result.user});

    case 'LOGOUT':
      return Object.assign(newState, {user: null});

    default:
      return newState;
  }
}
