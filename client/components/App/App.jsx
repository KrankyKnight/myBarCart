/**
 * @description Top level container for application
 */

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InventoryDisplay } from '../InventoryDisplay'
import { MainDisplay } from '../MainDisplay';
import { RecipeCardModal } from '../RecipeCardModal';
import { HelpModalButton } from '../HelpModalButton';
import { updateRecipeListState, checkLocalStorage, fetchDbStatusThunk, updateRecipeListCallThunk, fetchRecipesThunk } from '../../actions';
import './styles.scss';

const App = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.bar.cart);
  const viewMode = useSelector((state) => state.bar.viewMode);
  const recipeList = useSelector((state) => state.bar.recipeList);
  const modalStatus = useSelector((state) => state.modal.displayModal);
  const modalInformation = useSelector((state) => state.modal.recipeModal);
  
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
      <HelpModalButton/>
      <InventoryDisplay key='InventoryDisplay'/>
      <MainDisplay key='MainDisplay'/>
      {modalStatus === 'recipe' ? <RecipeCardModal key='RecipeCardModal' info={modalInformation}/> : <></>}
    </div>
  );
};

export default App;