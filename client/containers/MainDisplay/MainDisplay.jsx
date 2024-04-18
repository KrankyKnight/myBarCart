/**
 * @description main container for display
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Inventory from '../Inventory'
import Options from '../Options';
import APIDisplay from '../APIDisplay';
import './styles.scss';

const MainDisplay = () => {

  const state = useSelector(state => state.bar);

  useEffect(() => console.log('current state: ', state));

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;