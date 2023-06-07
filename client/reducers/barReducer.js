import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientSearch: undefined,
}

const barReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getIngredients, (state, action) => { //import the full ingredient list from the api
      console.log('payload', action.payload)
      let newIngredients = [];
      for (const drink of action.payload.drinks) {
        newIngredients.push(drink.strIngredient1);
      }
      state.viewMode = 'ingredients' //shift the view panel to display ingredients
      state.ingredientSearch = newIngredients;
    })

    .addDefaultCase((state) => state);
})

export default barReducer;