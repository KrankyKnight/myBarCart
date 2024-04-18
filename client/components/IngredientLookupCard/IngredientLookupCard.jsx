/**
 * @description ingredient tag made from lookup
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../actions/actions.js';
import './styles.scss';

const IngredientLookupCard = ({name}) => {

  const dispatch = useDispatch();
  const totalIngredientsPerRecipeRef = useSelector(state => state.bar.totalIngredientsPerRecipeRef);

  const addToCart = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/ingredients', {
      method: 'post',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ingredient: event.target.innerText, totalIngredientsPerRecipeRef: totalIngredientsPerRecipeRef}),
    })
      .then(data => data.json())
      .then(data => {
        data.ingredient = event.target.innerText;
        return data;
      })
      .then(data => dispatch(addItemToCart(data)))
      .catch(err => console.log(`Error: ${err}`));
  }

  return(
    <button className='ingredientCard' onClick={addToCart}>
      {name}
    </button>
  )
}

export default IngredientLookupCard;