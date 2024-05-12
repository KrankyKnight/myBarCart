/**
 * @description inventory cards
 */

import React from 'react';
import { removeItemFromCart } from '../../actions';
import { useDispatch } from 'react-redux';
import './styles.scss';

const InventoryItem = ({name}) => {

  const dispatch = useDispatch();

  const removeItem = (event) => {
    event.preventDefault();
    dispatch(removeItemFromCart(`${name}`));
  };

  return(
    <li className='barCard'>
      <button id={name} onClick={removeItem}>{name}</button>
    </li>
  )
}

export default InventoryItem;