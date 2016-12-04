import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {DevTools} from '../containers';
import combineReducers from '../reducers/combineReducers';
import composeSagas from '../sagas/combineSagas';

export default function() {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = compose(applyMiddleware(sagaMiddleware), DevTools.instrument());
  const store = createStore(combineReducers, {}, enhancer);

  sagaMiddleware.run(composeSagas);

  return store;
}
