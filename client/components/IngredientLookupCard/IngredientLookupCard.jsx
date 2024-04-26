/**
 * @description ingredient tag made from lookup
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRecipeListState, addItemToCart } from '../../actions/actions.js';
import './styles.scss';

const IngredientLookupCard = ({ingredientID, displayName}) => {

  const dispatch = useDispatch();

  const addToCart = (event) => {
    event.preventDefault();
    dispatch(addItemToCart({id: event.target.id, displayName: event.target.textContent}));
    dispatch(updateRecipeListState());
  }

  return(
    <button id={ingredientID} className='ingredientCard' onClick={addToCart}>
      {displayName}
    </button>
  )
}

export default IngredientLookupCard;