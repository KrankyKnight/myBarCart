/**
 * @description Redux Thunk actions
 */

import * as action from './actions.js';

export const fetchDbStatusThunk = () => {
  return async (dispatch) => {
    await dispatch(action.fetchDbStatusRequest());
    await fetch('/db')
      .then(data => data.json())
      .then(data => {
        if(data.err) console.error(data.err);
        dispatch(action.fetchDbStatusSuccess(data));
      })
      .catch(err => {
        dispatch(action.fetchDbStatusFailure());
        console.error(err);
      });
  };
};

export const updateRecipeListCallThunk = () => {
  return async (dispatch, getState) => {
    const cart = getState().bar.cart;
    if(!cart.length) dispatch(action.updateRecipeList([]));
    else {
      await fetch('http://localhost:3000/recipes/getRecipeList', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({recipeIdArray: cart}),
      })
        .then(data => data.json())
        .then(data => {
          if(data.err) console.error(data.err);
          if(Array.isArray(data)) {
            dispatch(action.updateRecipeList(data))
          }
          else {
            dispatch(action.updateRecipeListState('done'));
            console.error(data.err);
          };
        })
        .catch(err => {
          console.error(err)
        });
    };
  };
};

export const generateIngredientListThunk = () => {
  return async (dispatch, getState) => {
    const ingredientList = getState().bar.ingredientList;
    if(!ingredientList.length) {
      fetch('http://localhost:3000/ingredients')
        .then(data => data.json())
        .then(data => {
          if(data.err) console.error(data.err);
          dispatch(action.getIngredientList(data));
        })
        .catch(err => console.log(err))
    };
  };
};

export const fetchRecipesThunk = () => {
  return async (dispatch, getState) => {
    const recipeList = getState().bar.recipeList;
    fetch('http://localhost:3000/recipes/getRecipes', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({recipeIdArray: recipeList}),
    })
      .then(data => data.json())
      .then(data => {
        if(data.err) console.error(data.err);
        dispatch(action.displayRecipes(data));
      })
      .catch(err => {
        dispatch(action.serverError());
        console.error(err)
      });
  };
};