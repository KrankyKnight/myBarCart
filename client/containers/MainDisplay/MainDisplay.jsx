/**
 * @description main container for display
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory from '../Inventory'
import Options from '../Options';
import APIDisplay from '../APIDisplay';
import { initializeCart } from '../../actions/actions.js';
import './styles.scss';

const MainDisplay = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);

  if(cart === undefined) {
    fetch('http://localhost:3000/ingredients/initialCart')
      .then(data => data.json())
      .then(data => {
        dispatch(initializeCart(data))
      })
      .catch(err => console.log(`Error intitializing cart: ${err}`))
  };

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;