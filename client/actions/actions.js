// @description: action list for reducer

import { createAction } from "@reduxjs/toolkit";

export const getIngredients = createAction('GET_INGREDIENTS');
export const updateCart = createAction('UPDATE_CART');
export const initializeCart = createAction('INITIALIZE_CART');