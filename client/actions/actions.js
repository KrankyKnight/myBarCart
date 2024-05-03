/**
 * @description Sync and Async action creators
 */

import { createAction } from "@reduxjs/toolkit";

/* ACTION CREATORS */

export const getIngredientList = createAction('GET_INGREDIENTS');
export const removeItemFromCart = createAction('REMOVE_ITEM_FROM_CART');
export const displayRecipes = createAction('DISPLAY_RECIPES');
export const pendingRecipes = createAction('PENDING_RECIPES');
export const addItemToCart = createAction('ADD_ITEM_TO_CART');
export const setViewIngredientsList = createAction('SET_VIEW_INGREDIENTS_LIST');
export const updateSearchText = createAction('UPDATE_SEARCH_TEXT');
export const updateRecipeList = createAction('UPDATE_RECIPE_LIST');
export const updateRecipeListState = createAction('UPDATE_RECIPE_LIST_STATE');
export const fetchDbStatusRequest = createAction('FETCH_DB_STATUS_REQUEST');
export const fetchDbStatusSuccess = createAction('FETCH_DB_STATUS_SUCCESS');
export const fetchDbStatusFailure = createAction('FETCH_DB_STATUS_FAILURE');

/* THUNK ACTION CREATORS */

export const fetchDbStatusThunk = () => {
  return async (dispatch) => {
    await dispatch(fetchDbStatusRequest());
    await fetch('/db')
      .then(data => data.json())
      .then(data => {
        dispatch(fetchDbStatusSuccess(data))
        if(data === 'Offline') dispatch(pingLoopThunk());
      })
      .catch(err => {
        dispatch(fetchDbStatusFailure())
        throw err;
      });
  };
};

export const pingLoopThunk = () => {
  return async (dispatch) => {
    const idle = () => {
      setTimeout(() => {
        dispatch(fetchDbStatusThunk());
      }, 2000)  
    };
    setTimeout(() => {
      dispatch(fetchDbStatusSuccess('Pending')); 
      idle();
    }, 8000)
  };
};

export const updateRecipeListCallThunk = () => {
  return async (dispatch, getState) => {
    const cart = getState().bar.cart;
    if(!cart.length) dispatch(updateRecipeList([]));
    else {
      await fetch('http://localhost:3000/recipes/getRecipeList', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({recipeIdArray: cart}),
      })
        .then(data => data.json())
        .then(data => {
          if(Array.isArray(data)) dispatch(updateRecipeList(data))
          else {
            dispatch(updateRecipeListState('done'));
            console.error(data.err);
          };
        })
        .catch(err => console.error(err));
    };
  };
};