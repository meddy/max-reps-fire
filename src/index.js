import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {receiveSignIn, receiveSignOut} from './actions';
import {Home, NoMatch} from './components';
import {App, DevTools, Workouts} from './containers';
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
const store = createStore(reduceState, {}, enhancer);
const isAuthenticated = createIsAuthenticated(store.getState);

sagaMiddleware.run(rootSaga);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(receiveSignIn(user.displayName));
  } else {
    store.dispatch(receiveSignOut());
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="workouts" component={Workouts}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
