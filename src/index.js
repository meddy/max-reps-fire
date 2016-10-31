import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'

import App from './App';
import NoMatch from './NoMatch';
import SignIn from './SignIn';
import Workouts from './Workouts';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const routeConfig = <Router history={browserHistory}>
  <Route path="/" component={App}>
    <Route path="sign-in" component={SignIn}/>
    <Route path="workouts" component={Workouts}/>
    <Route path="*" component={NoMatch}/>
  </Route>
</Router>;

ReactDOM.render(routeConfig, document.getElementById('root'));
