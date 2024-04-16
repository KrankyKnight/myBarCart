/**
 * @description ingredient tag made from lookup
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../actions/actions.js';

const IngredientLookupCard = ({name}) => {

  const dispatch = useDispatch();

  //when clicked add selection to database to persist through application runs
  const addToCart = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ingredients', { //post ingredient to db
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ingredient: event.target.innerText}),
    })
      .then(data => data.json()) //convert returned database
      .then(data => {
        if(data === 'no change') {
          console.log('no change made') //if state does not need to change
        } else {
          dispatch(updateCart(data)); //update state
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