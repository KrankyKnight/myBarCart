import * as actions from '../actions';
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  viewMode: 'none',
  ingredientList: [],
  filteredIngredientList: [],
  recipeList: [],
  recipeListState: 'Updating...',
  searchText: '',
  recipes: [],
  cart: {},
  dbStatus: 'Offline',
};

const barReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(actions.getIngredientList, (state, action) => {
      state.ingredientList = action.payload.sort((a,b) => {
        if(a.lookupName < b.lookupName) return -1;
        if(b.lookupName < a.lookupName) return 1;
        return 0;
      });
    })

    .addCase(actions.setViewIngredientsList, (state) => {
      state.viewMode = 'ingredients';
    })

    .addCase(actions.checkLocalStorage, (state) => {
      const storage = JSON.parse(window.sessionStorage.getItem('mbc-cart'));
      if(storage && storage.length) state.cart = storage;
      else state.cart = {length:0};
    })

    .addCase(actions.emptyCart, (state, action) => {
      state.cart = {length: 0};
    })

    .addCase(actions.addItemToCart, (state, action) => {
      const {id, displayName} = action.payload;
      if(state.cart[displayName] === undefined) {
        state.cart[displayName] = id;
        state.cart.length++;
      };
    })

    .addCase(actions.removeItemFromCart, (state, action) => { //UPDATED
      const entryToRemove = action.payload;
      if(state.cart[entryToRemove] !== undefined) {
        delete state.cart[entryToRemove];
        state.cart.length--;
      };
    })
    
    .addCase(actions.updateSearchText, (state, action) => {
      state.searchText = action.payload;
      const minSearch = state.searchText.replace(/\s*/, "");
      const regex = new RegExp(minSearch, 'i');
      state.filteredIngredientList = state.ingredientList.filter(ingredient => regex.test(ingredient.lookupName))
    })

    .addCase(actions.pendingRecipes, (state) => {
      state.viewMode = 'recipes';
      state.recipes = 'pending';
    })

    .addCase(actions.displayRecipes, (state, action) => {
      if(!action.payload.length) state.recipes = []; 
      else state.recipes = action.payload;
    })

    .addCase(actions.updateRecipeListState, (state, action) => {
      if(action.payload === 'updating') state.recipeListState = 'Updating Recipe Total...';
      else if(action.payload === 'done') state.recipeListState = `Total Recipes: 0`;
    })

    .addCase(actions.updateRecipeList, (state, action) => {
      state.recipeList = action.payload;
      state.recipeListState = `Total Recipes: ${action.payload.length}`;
    })

    // DB Tests
    .addCase(actions.fetchDbStatusRequest, (state) => {
      state.dbStatus = 'pending'
    })

    .addCase(actions.fetchDbStatusSuccess, (state, action) => {
      if(action.payload !== 'Online' && action.payload !== 'Pending') state.dbStatus = 'Offline';
      else state.dbStatus = action.payload;
    })

    .addCase(actions.fetchDbStatusFailure, (state) => {
      state.dbStatus = 'Offline';
    })

    .addDefaultCase((state) => state);
});

export default barReducer;