/**
 * @description Top level container for application
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InventoryDisplay } from '../components/InventoryDisplay'
import { OptionsDisplay } from '../components/OptionsDisplay';
import { MainDisplay } from '../components/MainDisplay';
import { updateRecipeListState, checkLocalStorage, fetchDbStatusThunk, updateRecipeListCallThunk, fetchRecipesThunk } from '../actions';
import './styles.scss';

const App = () => {
  const dispatch = useDispatch();
  const newWord = "test";
  const cart = useSelector((state) => state.bar.cart);
  const viewMode = useSelector((state) => state.bar.viewMode);
  const recipeList = useSelector((state) => state.bar.recipeList);
  
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
  useEffect(() => {
    if(viewMode === 'recipes') {
      dispatch(fetchRecipesThunk());
    }
  }, [recipeList])

  return(
    <div id='app'>
      <OptionsDisplay key='OptionsDisplay'/>
      <InventoryDisplay key='InventoryDisplay'/>
      <MainDisplay key='MainDisplay'/>
    </div>
  );
};

export default App;