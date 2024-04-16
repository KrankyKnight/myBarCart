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

    .addCase(actions.getIngredients, (state, action) => {
      let newIngredients = [];
      for (const drink of action.payload.drinks) {
        newIngredients.push(drink.strIngredient1);
      }
      state.viewMode = 'ingredients'
      state.ingredientSearch = newIngredients.sort();
    })

    .addCase(actions.updateCart, (state, action) => {
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
      state.viewMode = 'recipes';
      state.recipes = 'pending';
    })

    .addCase(actions.getRecipes, (state, action) => {
      if(action.payload === 'no results') {
        state.recipes = [];
      } else {
        state.recipes = action.payload;
      }
    })

    .addDefaultCase((state) => state);
})

export default barReducer;

//fake recipe for testing
// [
//   {
//     id: '13377',
//     name: 'Sea breeze',
//     content: 'Alcoholic',
//     glass: 'Highball glass',
//     instructions: 'Build all ingredients in a highball glass filled with ice. Garnish with lime wedge.',
//     image: 'https://www.thecocktaildb.com/images/media/drink/7rfuks1504371562.jpg',
//     ingredients: [
//       'Vodka: 1 1/2 oz ',
//       'Cranberry juice: 4 oz ',
//       'Grapefruit juice: 1 oz '
//     ]
//   }
// ]