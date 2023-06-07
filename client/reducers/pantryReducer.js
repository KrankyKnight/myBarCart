import * as actions from '../actions/actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
}

const pantryReducer = createReducer(initialState, (builder) => {
  builder
    .addDefaultCase((state) => state);
})

export default pantryReducer;