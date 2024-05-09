/**
 * @description Redux Actions
 */

import { createAction } from "@reduxjs/toolkit";

export const getIngredientList = createAction('GET_INGREDIENTS');
export const displayRecipes = createAction('DISPLAY_RECIPES');
export const pendingRecipes = createAction('PENDING_RECIPES');
export const checkLocalStorage = createAction('CHECK_LOCAL_STORAGE');
export const emptyCart = createAction('EMPTY_CART');
export const addItemToCart = createAction('ADD_ITEM_TO_CART');
export const removeItemFromCart = createAction('REMOVE_ITEM_FROM_CART');
export const setViewIngredientsList = createAction('SET_VIEW_INGREDIENTS_LIST');
export const updateSearchText = createAction('UPDATE_SEARCH_TEXT');
export const updateRecipeList = createAction('UPDATE_RECIPE_LIST');
export const updateRecipeListState = createAction('UPDATE_RECIPE_LIST_STATE');
export const fetchDbStatusRequest = createAction('FETCH_DB_STATUS_REQUEST');
export const fetchDbStatusSuccess = createAction('FETCH_DB_STATUS_SUCCESS');
export const fetchDbStatusFailure = createAction('FETCH_DB_STATUS_FAILURE');
export const serverError = createAction('SERVER_ERROR');