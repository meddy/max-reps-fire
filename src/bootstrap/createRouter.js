import React from 'react';
import {Provider} from 'react-redux';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {NoMatch, App, Exercises, Home, Workouts, WorkoutTemplate, WorkoutTemplateEdit} from '../containers';
import createRouteGuards from '../helpers/createRouteGuards';

export default function createRouter(store) {
  const routeGuards = createRouteGuards(store);
  return <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route onEnter={routeGuards.auth}>
          <Route path="workouts" component={Workouts} />
          <Route path="exercises" component={Exercises} />
          <Route path="workout-template" onEnter={routeGuards.workoutTemplate}>
            <Route path=":workoutTemplateKey" component={WorkoutTemplate} />
            <Route path=":workoutTemplateKey/edit" component={WorkoutTemplateEdit} />
          </Route>
        </Route>
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>;
}
