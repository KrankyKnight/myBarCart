/**
 * @description display users selected ingredients
 */

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InventoryItem from '../InventoryItem';
import './styles.scss';
import { emptyCart } from '../../actions';

export const InventoryDisplay = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);
  const recipeListState = useSelector((state) => state.bar.recipeListState);

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
  }, [])

  return(
    <div id='InventoryDisplay'>
      <div id="recipeListState">
        <div>{recipeListState}</div>
        <button onClick={clearCart}>Clear</button>
      </div>
      <ul id='inventoryList'>
        {cart.length ? newCart:  
          <div>
            Inventory Empty
          </div>}
      </ul>
    </div>
  );
};