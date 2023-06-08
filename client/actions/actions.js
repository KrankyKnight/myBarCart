// @description: action list for reducer

import { createAction } from "@reduxjs/toolkit";

export const getIngredients = createAction('GET_INGREDIENTS');
export const updateCart = createAction('UPDATE_CART');
export const initializeCart = createAction('INITIALIZE_CART');
export const deleteCard = createAction('DELETE_CARD');
export const getRecipes = createAction('GET_RECIPES');
export const pendingRecipes = createAction('PENDING_RECIPES');