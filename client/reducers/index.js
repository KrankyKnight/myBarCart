import { combineReducers } from 'redux';
import barReducer from './barReducer.js';
import modalReducer from './modalReducer.js';

const reducers = combineReducers({
  bar: barReducer,
  modal: modalReducer,
});

export default reducers;