/**
 * @description Redux Thunk actions
 */

import * as action from './actions';

export const fetchDbStatusThunk = () => {
  return async (dispatch) => {
    await dispatch(action.fetchDbStatusRequest());
    await fetch('/db')
      .then(data => data.json())
      .then(data => {
        if(data.err) console.error(data.err);
        dispatch(action.fetchDbStatusSuccess(data));
        if(data === 'Offline' || data.err) dispatch(pingLoopThunk());
      })
      .catch(err => {
        dispatch(action.fetchDbStatusFailure());
        console.error(err);
      });
  };
};

export const pingLoopThunk = () => {
  return async (dispatch) => {
    const idle = () => {
      setTimeout(() => {
        dispatch(fetchDbStatusThunk());
      }, 2000);
    };
    setTimeout(() => {
      dispatch(action.fetchDbStatusSuccess('Pending')); 
      idle();
    }, 8000);
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
          if(Array.isArray(data)) dispatch(action.updateRecipeList(data))
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