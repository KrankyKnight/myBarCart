import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  displayModal: false,
  recipeModal: {},
  helpModalPage: 0
};

const modalReducer = createReducer(initialState, (builder) => {
  builder
    
    .addCase(actions.modalOn, (state, action) => {
      state.displayModal = action.payload;
    })

    .addCase(actions.modalOff, (state) => {
      state.displayModal = false;
    })

    .addCase(actions.changeHelpModalPage, (state, action) => {
      state.helpModalPage = action.payload;
    })

    .addCase(actions.setRecipeModal, (state, action) => {
      state.recipeModal = action.payload;
    })

    .addDefaultCase((state) => state);
})

export default modalReducer;