/**
 * @description Top level container for application
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory from '../containers/Inventory'
import Options from '../containers/Options';
import APIDisplay from '../containers/APIDisplay';
import { updateRecipeListState, checkLocalStorage, fetchDbStatusThunk, updateRecipeListCallThunk } from '../actions/actions';
import './styles.scss';

const MainDisplay = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.bar.cart);
  
  const addToSessionStorage = useCallback(() => {
    const dataToStore = JSON.stringify(cart);
    window.sessionStorage.setItem('mbc-cart', dataToStore);
  }, [cart])

  useEffect(() => dispatch(checkLocalStorage()), []);
  useEffect(() => dispatch(fetchDbStatusThunk()), []);
  useEffect(() => dispatch(updateRecipeListState('done')), []);
  useEffect(() => {
    addToSessionStorage();
    dispatch(updateRecipeListCallThunk())
  }, [cart]);

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;