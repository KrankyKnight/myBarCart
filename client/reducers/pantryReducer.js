import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
}

const pantryReducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state) => state);
})

export default pantryReducer;