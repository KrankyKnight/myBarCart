/**
 * @description ingredient tag made from lookup
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { updateRecipeListState, addItemToCart } from '../../actions';
import './styles.scss';

export const IngredientItem = ({ingredientID, displayName}) => {
  const dispatch = useDispatch();

  const addToCart = (event) => {
    event.preventDefault();
    dispatch(addItemToCart({id: event.target.id, displayName: event.target.textContent}));
    dispatch(updateRecipeListState());
  };

  return(
    <button id={ingredientID} className='ingredient ingredientItem' onClick={addToCart}>
      {displayName}
    </button>
  )
};