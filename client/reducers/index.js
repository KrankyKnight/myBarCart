import { combineReducers } from 'redux';
import barReducer from './barReducer.js';

const reducers = combineReducers({
  bar: barReducer,
});

export default reducers;