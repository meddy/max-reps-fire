import {combineReducers} from 'redux';
import reduceUserState from './reduceUserState';

export default reduceState = combineReducers({
  user: reduceUserState
});
