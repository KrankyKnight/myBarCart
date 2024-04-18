/**
 * @description display stored ingredients
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InventoryItem from '../../components/InventoryItem';
import { initializeCart } from '../../actions/actions.js';
import './styles.scss';

const Inventory = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);

  const newCart = [];
  let count = 0;

  if(!cart.length) {
    fetch('http://localhost:3000/ingredients/initialCart')
      .then(data => data.json())
      .then(data => {
        dispatch(initializeCart(data))
      })
      .catch(err => console.log(`Error intitializing cart: ${err}`))
  };

  if(cart.length) {
    for(const ingredient of cart) {
      count++;
      newCart.push(<InventoryItem key={`cart${count}`} name={ingredient} dispatch={dispatch}/>)
    };
  };

  return(
    <div id='Inventory' className='inventory'>
      <ul>
        {cart.length ? newCart:  
          <div className='barInventory'>
            Inventory Empty
          </div>}
      </ul>
    </div>
  );
};

export default Inventory;