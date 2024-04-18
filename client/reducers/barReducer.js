import * as actions from '../actions/actions.js';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientList: [],
  filteredIngredientList: [],
  searchText: '',
  recipes: [],
  cart: {length:0},
  ingredientToRecipeRef: {},
  totalIngredientsPerRecipeRef: {},
}

const barReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(actions.getIngredientList, (state, action) => {
      state.ingredientList = action.payload;
    })

    .addCase(actions.setViewIngredientsList, (state, action) => {
      state.viewMode = 'ingredients';
    })

    .addCase(actions.updateSearchText, (state, action) => {
      state.searchText = action.payload;
      const minSearch = state.searchText.replace(/\s*/, "");
      const regex = new RegExp(minSearch, 'i');
      state.filteredIngredientList = state.ingredientList.filter(ingredient => regex.test(ingredient.toLowerCase().replace(/\s*/, "")))
    })

    .addCase(actions.removeItemFromCart, (state, action) => { //UPDATED
      const entryToRemove = action.payload;
      if(state.cart[entryToRemove] !== undefined) {
        delete state.cart[entryToRemove];
        state.cart.length--;
      };
    })

    .addCase(actions.pendingRecipes, (state, action) => {
      state.viewMode = 'recipes';
      state.recipes = 'pending';
    })

    .addCase(actions.displayRecipes, (state, action) => {
      if(!action.payload.length) {
        state.recipes = [];
      } else {
        state.recipes = action.payload;
      }
    })

    .addCase(actions.addItemToCart, (state, action) => { //UPDATED
      const {ingredient, newIngredientEntry, totalIngredientsPerRecipeRef} = action.payload;
      if(state.cart[ingredient] === undefined) {
        state.cart[ingredient] = ingredient;
        state.cart.length++;
      };
      state.ingredientToRecipeRef[ingredient] = newIngredientEntry[ingredient];
      state.totalIngredientsPerRecipeRef = totalIngredientsPerRecipeRef;
    })

    .addDefaultCase((state) => state);
})

export default barReducer;