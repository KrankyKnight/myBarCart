/**
 * @description API search OptionsDisplay
 */

import React, { useEffect} from 'react';
import { generateIngredientListThunk, setViewIngredientsList, fetchRecipesThunk, pendingRecipes, updateSearchText } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

export const OptionsDisplay = () => {
  
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.bar.recipes);
  const dbStatus = useSelector((state) => state.bar.dbStatus);

  const displayIngredients = (event) => {
    event.preventDefault();
    dispatch(setViewIngredientsList());
  };

  const newSearchText = (event) => {
    event.preventDefault();
    dispatch(updateSearchText(event.target.value));
  };

  const dispatchPendingRecipes = (event) => {
    event.preventDefault();
    dispatch(pendingRecipes());
  };

  useEffect(() => {
    if(recipes === 'pending') dispatch(fetchRecipesThunk());
  }, [recipes])

  useEffect(() => {
    if(dbStatus === 'Online') dispatch(generateIngredientListThunk());
  }, [dbStatus]);

  return(
    <div id='OptionsDisplay' className='input'>
      <div id="db-status" className={`status ${dbStatus}`}>DB Status: {dbStatus}</div>
      <button onClick={dispatchPendingRecipes}>Generate Recipes</button>
      <input 
        name='ingredient' 
        type='text' 
        placeholder='search ingredient' 
        className='field' id='lookupText' 
        onFocus={displayIngredients}
        onChange={newSearchText}></input>
    </div>
  )
}