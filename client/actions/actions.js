// @description: action list for reducer

import { createAction } from "@reduxjs/toolkit";

export const getIngredientList = createAction('GET_INGREDIENTS');
export const removeItemFromCart = createAction('REMOVE_ITEM_FROM_CART');
export const displayRecipes = createAction('DISPLAY_RECIPES');
export const pendingRecipes = createAction('PENDING_RECIPES');
export const addItemToCart = createAction('ADD_ITEM_TO_CART');
export const setViewIngredientsList = createAction('SET_VIEW_INGREDIENTS_LIST');
export const updateSearchText = createAction('UPDATE_SEARCH_TEXT');
export const updateRecipeList = createAction('UPDATE_RECIPE_LIST');
export const updateRecipeListState = createAction('UPDATE_RECIPE_LIST_STATE');