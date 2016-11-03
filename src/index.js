import firebase from 'firebase';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import {createStore, applyMiddleware} from 'redux'

import App from './App';
import NoMatch from './NoMatch';
import SignIn from './SignIn';
import Workouts from './Workouts';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

function requireAuth(nextState, replace, cb) {
  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (!result.user) {
        replace('/sign-in');
      }
      cb();
    })
    .catch(err => {
      replace('/error');
      cb(err);
    });
}

const routeConfig = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="sign-in" component={SignIn}/>
    <Route path="workouts" component={Workouts} onEnter={requireAuth}/>
    <Route path="*" component={NoMatch}/>
  </Route>
</Router>;

ReactDOM.render(routeConfig, document.getElementById('root'));
