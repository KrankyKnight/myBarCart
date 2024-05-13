/**
 * @description Top level container for application
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InventoryDisplay } from '../InventoryDisplay'
import { MainDisplay } from '../MainDisplay';
import { RecipeCardModal } from '../RecipeCardModal';
import { updateRecipeListState, checkLocalStorage, fetchDbStatusThunk, updateRecipeListCallThunk, fetchRecipesThunk } from '../../actions';
import './styles.scss';

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);
  const viewMode = useSelector((state) => state.bar.viewMode);
  const recipeList = useSelector((state) => state.bar.recipeList);
  const modalStatus = useSelector((state) => state.bar.displayModal)
  
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
    <div id='App'>
      <InventoryDisplay key='InventoryDisplay'/>
      <MainDisplay key='MainDisplay'/>
      {modalStatus !== false ? <RecipeCardModal key='RecipeCardModal' info={modalStatus}/> : <></>}
    </div>
  );
};

export default App;