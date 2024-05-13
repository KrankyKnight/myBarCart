/**
 * @description display users selected ingredients
 */

import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InventoryItem from '../InventoryItem';
import { 
  emptyCart, 
  generateIngredientListThunk, 
  setViewIngredientsList, 
  fetchRecipesThunk, 
  pendingRecipes, 
  updateSearchText 
} from '../../actions';
import './styles.scss';

export const InventoryDisplay = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);
  const recipeListState = useSelector((state) => state.bar.recipeListState);
  const recipes = useSelector((state) => state.bar.recipes);
  const dbStatus = useSelector((state) => state.bar.dbStatus);

  const newCart = [];
  let key = 0;

  if(cart.length) {
    for(const ingredient in cart) {
      if(ingredient !== 'length') {
        key++;
        newCart.push(<InventoryItem key={`cart${key}`} name={ingredient}/>)
      };
    };
  };

  const clearCart = useCallback(() => {
    dispatch(emptyCart());
  }, []);

  const displayIngredients = (event) => {
    event.preventDefault();
    dispatch(setViewIngredientsList());
  };

  const newSearchText = (event) => {
    event.preventDefault();
    dispatch(updateSearchText(event.target.value));
  };

  const dispatchPendingRecipes = (event) => {
    event.preventDefault();
    dispatch(pendingRecipes());
  };

  useEffect(() => {
    if(recipes === 'pending') dispatch(fetchRecipesThunk());
  }, [recipes])

  useEffect(() => {
    if(dbStatus === 'Online') dispatch(generateIngredientListThunk());
  }, [dbStatus]);

  return(
    <div id='InventoryDisplay'>
      <div id="db-status" className={`status ${dbStatus}`} hidden>DB Status: {dbStatus}</div>
      <input 
        name='ingredient' 
        type='text' 
        placeholder='search ingredient' 
        className='field inventory' id='lookupText' 
        onFocus={displayIngredients}
        onChange={newSearchText}>
      </input>
      <div id="recipeListState">
        <button className='inventory' onClick={dispatchPendingRecipes}>Generate Recipes</button>
        <button className='inventory' onClick={clearCart}>Clear Ingredients</button>
      </div>
      <div id='totalRecipes'>{recipeListState}</div>
      <ul id="inventoryList" className={`cartLength${cart.length}`}>
        {cart.length ? newCart:  
          <div id='emptyListText'>
            Inventory Empty
          </div>}
      </ul>
    </div>
  );
};