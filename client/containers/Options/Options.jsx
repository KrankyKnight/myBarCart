/**
 * @description API search options
 */

import React, { useEffect } from 'react';
import { getIngredientList, setViewIngredientsList, displayRecipes, pendingRecipes, updateSearchText } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';

const Options = () => {
  
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.bar.recipes);
  const cart = useSelector((state) => state.bar.cart);
  const ingredientList = useSelector((state) => state.bar.ingredientList);
  const ingredientToRecipeRef = useSelector((state) => state.bar.ingredientToRecipeRef);
  const totalIngredientsPerRecipeRef = useSelector((state) => state.bar.totalIngredientsPerRecipeRef);

  const displayIngredients = (event) => {
    event.preventDefault();
    dispatch(setViewIngredientsList());
  }

  const newSearchText = (event) => {
    event.preventDefault();
    dispatch(updateSearchText(event.target.value));
  }

  const generateIngredientList = () => {
    if(!ingredientList.length) {
      fetch('http://localhost:3000/ingredients')
        .then(data => data.json())
        .then(data => dispatch(getIngredientList(data)))
        .catch(err => console.log(`Error: ${err}`))
    };
  };

  const dispatchPendingRecipes = (event) => {
    event.preventDefault();
    dispatch(pendingRecipes());
  };

  const fetchRecipes = async () => {
    const conditionCheck = {};
    const recipesToFetch = [];

    for(const ingredient in cart) {
      if(ingredient !== 'length'){
        for(const recipeId of ingredientToRecipeRef[ingredient]) {
          console.log(ingredient, ': ', recipeId);
          if(conditionCheck[recipeId] === undefined) conditionCheck[recipeId] = 0;
          conditionCheck[recipeId]++;
        };
      };
    };
    for(const recipeId in conditionCheck) {
      if(conditionCheck[recipeId] === totalIngredientsPerRecipeRef[recipeId]) recipesToFetch.push(recipeId);
    };
    await fetch('http://localhost:3000/recipes', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({recipeIdArray: recipesToFetch}),
    })
      .then(data => data.json())
      .then(data => dispatch(displayRecipes(data)))
      .catch(err => console.error(err));
  };

  if(recipes === 'pending') fetchRecipes();

  useEffect(generateIngredientList, []);

  return(
    <div id='Options' className='input'>
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