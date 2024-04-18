/**
 * @description inventory cards
 */

import React from 'react';
import { removeItemFromCart } from '../../actions/actions';
import { useDispatch } from 'react-redux';

const InventoryItem = ({name}) => {

  const dispatch = useDispatch();

  const removeItem = (event) => {
    console.log('attempt')
    event.preventDefault();
    dispatch(removeItemFromCart(`${name}`));
  };

  return(
    <li className='barCard'>
      <span id={name}>{name}</span>
      <button onClick={removeItem}>-</button>
    </li>
  )
}

export default InventoryItem;