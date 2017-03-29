import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import composeSagas from './sagas/combineSagas';

import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './resources/spinner.css';

import App from './App';
import createFirebase from './helpers/createFirebase';

createFirebase();

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers;
if (process.env.NODE_ENV === 'production') {
  composeEnhancers = compose;
} else {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(composeSagas);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
