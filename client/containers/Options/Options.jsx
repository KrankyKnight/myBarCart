/**
 * @description API search options
 */

import React, { useEffect, useCallback } from 'react';
import { getIngredientList, setViewIngredientsList, displayRecipes, pendingRecipes, updateSearchText } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const Options = () => {
  
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.bar.recipes);
  const recipeList = useSelector((state) => state.bar.recipeList);
  const ingredientList = useSelector((state) => state.bar.ingredientList);
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

  const generateIngredientList = useCallback(() => {
    if(!ingredientList.length) {
      fetch('http://localhost:3000/ingredients')
        .then(data => data.json())
        .then(data => dispatch(getIngredientList(data)))
        .catch(err => {console.log(`Error: ${err}`)})
    };
  }, []);

  const fetchRecipes = useCallback(() => {
    fetch('http://localhost:3000/recipes/getRecipes', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({recipeIdArray: recipeList}),
    })
      .then(data => data.json())
      .then(data => dispatch(displayRecipes(data)))
      .catch(err => console.error(err));
  }, [recipeList]);

  if(recipes === 'pending') fetchRecipes();

  useEffect(() => {
    if(dbStatus === 'Online') generateIngredientList();
  }, [dbStatus]);

  return(
    <div id='Options' className='input'>
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

export default Options;