import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientSearch: [],
}

const barReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getIngredients, (state, action) => {
      console.log('payload', action.payload)
    })
    .addDefaultCase((state) => state);
})

export default barReducer;