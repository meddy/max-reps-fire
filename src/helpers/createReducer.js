export default function createReducer(initialState, actionMap) {
  return (state = initialState, action) => {
    if (actionMap[action.type]) {
      return actionMap[action.type](state, action);
    }

    return state;
  };
}
