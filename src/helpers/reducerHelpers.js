import {cloneDeep} from 'lodash/fp';

import {SIGN_OUT} from '../actions';

export function createReducer(initialState, actionMap) {
  return (state = initialState, action) => {
    if (actionMap[action.type]) {
      return actionMap[action.type](state, action);
    }

    if (action.type === SIGN_OUT) {
      return cloneDeep(initialState);
    }

    return state;
  };
}

export function createActionCreator(type, ...argNames) {
  return (...args) => {
    let action = {type};

    argNames.forEach((arg, index) => {
      const key = argNames[index];
      action[key] = args[index];
    });

    return action;
  };
}