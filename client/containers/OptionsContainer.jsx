// @description: The HUD for functionality of app

import React from 'react';
import { getIngredients } from '../actions/actions';
import { getRecipes } from '../actions/actions';
import { pendingRecipes } from '../actions/actions';



const Options = ({dispatch, curState}) => {

  const getIngList = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ingredients')
      .then(data => data.json())
      .then(data => dispatch(getIngredients(data)))
      .catch(err => console.log(`Error: ${err}`))
  };

  const checkState = (event) => {
    event.preventDefault();
    console.log(curState);
  }

  const pendRecipes = (event) => {
    event.preventDefault();
    dispatch(pendingRecipes());
  }

  const fetchRecipes = () => {
    console.log('getting recipes');
    fetch('http://localhost:3000/ingredients/getRecipes')
      .then(data => {
        console.log('back with recipes');
        return data.json();
      })
      .then(data => dispatch(getRecipes(data)))
      .catch(err => console.log(`Error: ${err}`))
  }

  //check if pending recipes
  if(curState.recipes === 'pending') {
    fetchRecipes();
  }

  return(
    <div className='options'>
      <button onClick={getIngList}>Get Ingredients</button>
      <button onClick={checkState}>Check State</button>
      <button onClick={pendRecipes}>Generate Recipes</button>
    </div>
  )
}

export default Options;