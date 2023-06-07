// @description: The HUD for functionality of app

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../actions/actions';


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

  return(
    <div className='options'>
      <button onClick={getIngList}>Get Ingredients</button>
      <button onClick={checkState}>Check State</button>
    </div>
  )
}

export default Options;