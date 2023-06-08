// @description: Contains the app

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarContainer from './BarContainer.jsx'
import OptionsContainer from './OptionsContainer.jsx';
import CurrentViewContainer from './CurrentViewContainer.jsx';
import { initializeCart } from '../actions/actions.js';

const MainContainer = () => {
  /* THE HOOKS */
  const dispatch = useDispatch();
  const curState = useSelector(state => state.bar);
  const allIngredients = useSelector(state => state.bar.ingredientSearch);
  const currentMode = useSelector((state) => state.bar.viewMode);
  const cart = useSelector((state) => state.bar.cart);
  const recipes = useSelector(state => state.bar.recipes);

  /* THE CONTENT */
  //first generate cart state from db
  if(cart === undefined) {
    fetch('http://localhost:3000/ingredients/initialCart')
      .then(data => data.json())
      .then(data => {
        dispatch(initializeCart(data))
      })
      .catch(err => console.log(`Error intitializing cart: ${err}`))
  }

  return(
    <div className='mainContainer'>
      <OptionsContainer dispatch={dispatch} curState = {curState}/>
      <BarContainer cart={cart} dispatch={dispatch}/>
      <CurrentViewContainer currentMode={currentMode} allIngredients={allIngredients} dispatch={dispatch} recipes={recipes}/>
    </div>
  )
}

export default MainContainer;