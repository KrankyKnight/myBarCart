// @description: The HUD for functionality of app

import React from 'react';
import { getIngredients } from '../actions/actions';
import { getRecipes } from '../actions/actions';
import { pendingRecipes } from '../actions/actions';
import {updateCart} from '../actions/actions.js'



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

  const searchIngredient = (event) => {
    event.preventDefault();
    const target = document.getElementById('lookupText');
    fetch('http://localhost:3000/ingredients/lookup', { //post ingredient to db
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ingredient: target.value}),
    })
    .then(data => data.json())
    .then(data => dispatch(updateCart(data)))
    .catch(err => console.log(`Error: ${err}`))
  }

  return(
    <div className='options'>
      <button onClick={pendRecipes}>Generate Recipes</button>
      <button onClick={getIngList}>Get Ingredients</button>
      <div className='lookup'>
        <input name='ingredient' type='text' placeholder='look up an ingredient' className='field' id='lookupText'></input>
        <button className='button' onClick={searchIngredient}>Lookup</button>
      </div>
    </div>
  )
}

export default Options;

//optional button for testing <button onClick={checkState}>Check State</button>