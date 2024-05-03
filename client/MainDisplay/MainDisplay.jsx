/**
 * @description Top level container for application
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory from '../containers/Inventory'
import Options from '../containers/Options';
import APIDisplay from '../containers/APIDisplay';
import { updateRecipeListState, fetchDbStatusThunk, updateRecipeListCallThunk } from '../actions/actions';
import './styles.scss';

const MainDisplay = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.bar.cart);

  useEffect(() => dispatch(fetchDbStatusThunk()), []);
  useEffect(() => dispatch(updateRecipeListState('done')), []);
  useEffect(() => {dispatch(updateRecipeListCallThunk())}, [cart]);

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;