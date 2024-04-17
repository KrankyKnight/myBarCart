/**
 * @description ingredient tag made from lookup
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../actions/actions.js';
import './styles.scss';

const IngredientLookupCard = ({name}) => {

  const dispatch = useDispatch();

  const addToCart = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ingredients', {
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ingredient: event.target.innerText}),
    })
      .then(data => data.json())
      .then(data => {
        if(data === 'no change') {
          console.log('no change made');
        } else {
          dispatch(updateCart(data));
        }
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  return(
    <button className='ingredientCard' onClick={addToCart}>
      {name}
    </button>
  )
}

export default IngredientLookupCard;