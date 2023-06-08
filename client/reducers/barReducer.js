import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientSearch: [],
  cart: undefined,
}

const barReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.initializeCart, (state, action) => {
      const initialCart = []
      for (const ingredient in action.payload) {
        initialCart.push(ingredient);
      }
      state.cart = initialCart.sort();
    })

    .addCase(actions.getIngredients, (state, action) => { //import the full ingredient list from the api
      // console.log('getIngresiants payload', action.payload);
      let newIngredients = [];
      for (const drink of action.payload.drinks) {
        newIngredients.push(drink.strIngredient1);
      }
      state.viewMode = 'ingredients' //shift the view panel to display ingredients
      state.ingredientSearch = newIngredients.sort();
    })

    .addCase(actions.updateCart, (state, action) => {
      // console.log('update cart payload', action.payload)
      const newCart = []
      for (const ingredient in action.payload) {
        newCart.push(ingredient);
      }
      state.cart = newCart.sort();
    })

    .addDefaultCase((state) => state);
})

export default barReducer;