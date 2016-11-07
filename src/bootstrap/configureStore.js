import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import DevTools from '../containers/DevTools';
import reduceState from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(createSagaMiddleware());
  const enhancer = compose(middleware, DevTools.instrument());
  const store = createStore(reduceState, initialState, enhancer);

  sagaMiddleware.run(rootSaga);

  return store;
}
