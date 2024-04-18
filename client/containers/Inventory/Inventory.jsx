/**
 * @description display stored ingredients
 */

import React from 'react';
import { useSelector } from 'react-redux';
import InventoryItem from '../../components/InventoryItem';
import './styles.scss';

const Inventory = () => {

  const cart = useSelector((state) => state.bar.cart);

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