import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {requestSignIn, requestWorkoutTemplates} from '../actionCreators';
import {NoMatch, App, Exercises, Home, Workouts, WorkoutTemplate} from '../containers';
import {composeChecks, createGuard, createStateCheck} from '../helpers/guardHelpers';
import {getAuthReceived, getAuthenticated, getWorkoutTemplatesReceived, getWorkoutTemplate} from '../selectors';

export default function createRouter(store) {
  const isAuthenticated = createStateCheck(
    requestSignIn,
    getAuthReceived,
    getAuthenticated
  );

  const workoutTemplateExists = composeChecks([
    isAuthenticated,
    createStateCheck(
      requestWorkoutTemplates,
      getWorkoutTemplatesReceived,
      getWorkoutTemplate
    )
  ]);

  const guardAuth = createGuard(
    isAuthenticated,
    '/',
    store
  );

  const guardWorkoutTemplate = createGuard(
    workoutTemplateExists,
    '/no-match',
    store
  );

  return <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
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
          onEnter={guardWorkoutTemplate}
        />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>;
}
