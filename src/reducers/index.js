import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'

import reduceUser from './reduceUser';

const reduce = combineReducers({
  user: reduceUser
});

const middleware = applyMiddleware(createSagaMiddleware());
const enhancer = compose(middleware, DevTools.instrument());

export function configureStore(initialState) {
  return createStore(reduce, initialState, enhancer);
}