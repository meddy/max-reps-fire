import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {receiveSignIn} from './actions';
import {Home, NoMatch} from './components';
import {App, DevTools, Exercises, Workouts} from './containers';
import createIsAuthenticated from './helpers/createRedirectToAuth';
import reduceState from './reducers';
import rootSaga from './sagas';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './resources/index.css';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware), DevTools.instrument());
const store = createStore(reduceState, {}, enhancer);
const redirectToAuth = createIsAuthenticated(store.getState);

sagaMiddleware.run(rootSaga);

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(receiveSignIn(user.displayName));
  }
});

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
