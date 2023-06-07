// @description: The HUD for functionality of app

import React from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../actions/actions';

const Options = () => {
  const dispatch = useDispatch();
  
  const getIngList = (event) => {
    dispatch(getIngredients()); 
  }

  return(
    <div className='options'>
      <button onClick={getIngList}>Get Ingredients</button>
    </div>
  )
}

export default Options;