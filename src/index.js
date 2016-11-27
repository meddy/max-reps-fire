import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {browserHistory, IndexRoute, Route, Router} from 'react-router';
import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {requestSignIn} from './actionCreators';
import {NoMatch} from './components';
import {App, DevTools, Exercises, Home, Workouts} from './containers';
import createRedirectToSignIn from './helpers/createRedirectToSignIn';
import combineReducers from './reducers/combineReducers';
import composeSagas from './sagas/combineSagas';

import 'bootstrap/dist/css/bootstrap.css';
import './resources/index.css';
import './firebaseServices';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(applyMiddleware(sagaMiddleware), DevTools.instrument());
const store = createStore(combineReducers, {}, enhancer);
const redirectToSignIn = createRedirectToSignIn(store);

sagaMiddleware.run(composeSagas);
store.dispatch(requestSignIn());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="workouts" component={Workouts} onEnter={redirectToSignIn}/>
        <Route path="exercises" component={Exercises} onEnter={redirectToSignIn}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
