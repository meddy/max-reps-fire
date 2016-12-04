import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';

import {requestSignIn} from '../actionCreators';
import {NoMatch} from '../components';

import {
  App,
  Exercises,
  Home,
  Workouts,
  WorkoutTemplate
} from '../containers';

import {
  createGuard,
  createStateCheck
} from '../helpers/guardHelpers';

import {
  getAuthReceived,
  getAuthenticated
} from '../selectors';

// const workoutTemplateExists = createStateCheck(requestWorkoutTemplates, getWorkoutTemplatesReceived);

export default function createRouter(store) {
  const isAuthenticated = createStateCheck(requestSignIn, getAuthReceived, getAuthenticated);
  const guardAuth = createGuard(isAuthenticated, '/', store);

  return <Provider store={store}>
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
  </Provider>;
}
