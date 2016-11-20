import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {NoMatch} from './components';
import {App, DevTools, Exercises, Home, Workouts} from './containers';
import createRedirectToAuth from './helpers/createRedirectToAuth';
import combineReducers from './reducers/combineReducers';
import composeSagas from './sagas/combineSagas';

import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware), DevTools.instrument());
const store = createStore(combineReducers, {}, enhancer);
const redirectToAuth = createRedirectToAuth(store.getState);

sagaMiddleware.run(composeSagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="workouts" component={Workouts} onEnter={redirectToAuth}/>
        <Route path="exercises" component={Exercises} onEnter={redirectToAuth}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
