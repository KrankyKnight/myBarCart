import { combineReducers } from 'redux';
import pantryReducer from './pantryReducer.js';

const reducers = combineReducers({
  pantry: pantryReducer,
});

export default reducers;