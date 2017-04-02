import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {initializeCurrentLocation, provideRouter, routerForBrowser} from 'redux-little-router';
import createSagaMiddleware from 'redux-saga';
import {requestAuth} from './actions';
import * as reducers from './reducers';
import {routeMap} from './routes';
import composeSagas from './sagas';

import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './resources/spinner.css';

import App from './App';
import createFirebase from './helpers/createFirebase';

createFirebase();

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const routes = {
  '/': {},
  '/exercises': {},
  '/workouts': {},
  '/workout-template/:workoutTemplate': {},
  '/workout-template/:workoutTemplate/edit': {}
};

const router = routerForBrowser({routes: routeMap});

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  router.enhancer,
  applyMiddleware(router.middleware, sagaMiddleware)
);

const reducer = combineReducers({
  router: router.reducer,
  exercise: reducers.reduceExercise,
  exerciseTemplate: reducers.reduceExerciseTemplate,
  user: reducers.reduceUser,
  workoutTemplate: reducers.reduceWorkoutTemplate
});

const store = createStore(reducer, enhancer);

sagaMiddleware.run(composeSagas);

const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

store.dispatch(requestAuth());

const AppWithRouter = provideRouter({store})(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithRouter />
  </Provider>,
  document.getElementById('root')
);
