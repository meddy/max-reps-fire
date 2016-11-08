import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, browserHistory} from 'react-router'

import configureStore from './bootstrap/configureStore';
import configureFirebase from './bootstrap/configureFirebase';
import App from './App';
import NoMatch from './NoMatch';
import SignIn from './SignIn';
import Workouts from './Workouts';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const store = configureStore();
configureFirebase();

const rootComponent = <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="sign-in" component={SignIn}/>
      <Route path="workouts" component={Workouts}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
</Provider>;

const containerElement = document.getElementById('root');

ReactDOM.render(rootComponent, containerElement);
