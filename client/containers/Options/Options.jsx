/**
 * @description API search options
 */

import React from 'react';
import { getIngredients, getRecipes, pendingRecipes, updateCart } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';


const Options = () => {
  
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.bar.recipes);
  
  const getIngredientList = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ingredients')
      .then(data => data.json())
      .then(data => dispatch(getIngredients(data)))
      .catch(err => console.log(`Error: ${err}`))
  };

  const dispatchPendingRecipes = (event) => {
    event.preventDefault();
    dispatch(pendingRecipes());
  };

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

  if(recipes === 'pending') fetchRecipes();

  const searchIngredient = (event) => {
    event.preventDefault();
    const target = document.getElementById('lookupText');
    fetch('http://localhost:3000/ingredients/lookup', {
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
    <div className='Options'>
      <button onClick={dispatchPendingRecipes}>Generate Recipes</button>
      <button onClick={getIngredientList}>Get Ingredients</button>
      <div className='lookup'>
        <input name='ingredient' type='text' placeholder='look up an ingredient' className='field' id='lookupText'></input>
        <button className='button' onClick={searchIngredient}>Lookup</button>
      </div>
    </div>
  )
}

export default Options;