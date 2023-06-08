import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientSearch: [],
  recipes: undefined,
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

    .addCase(actions.deleteCard, (state, action) => {
      const newCart = []
      for (const ingredient in action.payload) {
        newCart.push(ingredient);
      }
      state.cart = newCart.sort();
    })

    .addCase(actions.pendingRecipes, (state, action) => {
      console.log('calling pending recipes action');
      state.viewMode = 'recipes';
      state.recipes = 'pending';
    })

    .addCase(actions.getRecipes, (state, action) => {
      console.log('calling get recipes action with ', action.payload)
      if(action.payload === 'no results') {
        state.recipes = [];
      } else {
        state.recipes = action.payload;
      }
    })

    .addDefaultCase((state) => state);
})

export default barReducer;