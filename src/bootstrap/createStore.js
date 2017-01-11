import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import combineReducers from '../reducers/combineReducers';
import composeSagas from '../sagas/combineSagas';

export default function () {
  const sagaMiddleware = createSagaMiddleware();
  let composeEnhancers;

  if (process.env.NODE_ENV === 'production') {
    composeEnhancers = compose;
  } else {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(combineReducers, {}, enhancer);

  sagaMiddleware.run(composeSagas);

  return store;
}
