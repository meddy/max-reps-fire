import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {requestSignIn, requestWorkoutTemplates} from './actionCreators';
import {NoMatch} from './components';
import {
  App,
  DevTools,
  Exercises,
  Home,
  Workouts,
  WorkoutTemplate
} from './containers';
import {
  composeChecks,
  createGuard,
  createStateCheck
} from './helpers/guardHelpers';
import combineReducers from './reducers/combineReducers';
import composeSagas from './sagas/combineSagas';
import {
  getAuthReceived,
  getAuthenticated,
  getWorkoutTemplatesReceived,
  getWorkoutTemplate
} from './selectors';

import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './firebaseServices';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware), DevTools.instrument());
const store = createStore(combineReducers, {}, enhancer);

const isAuthenticated = createStateCheck(requestSignIn, getAuthReceived, getAuthenticated);
const workoutTemplateExists = createStateCheck(requestWorkoutTemplates, getWorkoutTemplatesReceived);

const guardAuth = createGuard(isAuthenticated, '/', store);

sagaMiddleware.run(composeSagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route
          path="workouts"
          component={Workouts}
          onEnter={guardAuth}
        />
        <Route
          path="exercises"
          component={Exercises}
          onEnter={guardAuth}
        />
        <Route
          path="workout-template/:workoutTemplateKey"
          component={WorkoutTemplate}
          onEnter={guardAuth}
        />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
