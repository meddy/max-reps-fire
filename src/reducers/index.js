import {combineReducers} from 'redux';
import reduceUserState from './reduceUserState';

export default combineReducers({
  user: reduceUserState
});
