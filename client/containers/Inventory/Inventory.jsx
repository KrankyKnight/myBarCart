/**
 * @description display stored ingredients
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InventoryItem from '../../components/InventoryItem';
import './styles.scss';

const Inventory = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);

  const newCart = [];
  let count = 0;

  if(cart) {
    for(const ingredient of cart) {
      count++;
      newCart.push(<InventoryItem key={`cart${count}`} name={ingredient} dispatch={dispatch}/>)
    };
  };

  return(
    <div id='Inventory' className='inventory'>
      <ul>
        {cart ? newCart:  
          <div className='bar loading'>
            Loading Cart...
          </div>}
      </ul>
    </div>
  );
};

export default Inventory;