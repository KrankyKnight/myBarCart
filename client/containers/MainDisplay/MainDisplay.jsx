/**
 * @description main container for display
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import Inventory from '../Inventory'
import Options from '../Options';
import APIDisplay from '../APIDisplay';
import './styles.scss';

const MainDisplay = () => {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);
  const state = useSelector((state) => state);

  useEffect(() => console.log('current state:', state.bar))

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;