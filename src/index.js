import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {App, DevTools, NoMatch, SignIn, Workouts} from './containers';
import createIsAuthenticated from './helpers/createIsAuthenticated';
import reduceState from './reducers';
import rootSaga from './sagas';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './resources/index.css';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const enhancer = compose(middleware, DevTools.instrument());
const store = createStore(reduceState, null, enhancer);
const isAuthenticated = createIsAuthenticated(store.getState);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="sign-in" component={SignIn}/>
        <Route path="workouts" component={Workouts} onEnter={isAuthenticated}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
