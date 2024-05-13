/**
 * @description Recipe cards
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { RecipeCardIngredientItem } from '../RecipeCardIngredientItem/RecipeCardIngredientItem.jsx';
import { removeModal } from '../../actions/actions.js'
import './styles.scss';

export const RecipeCardModal = ({ info }) => {

  const { name, content, glass, instructions, image, ingredients } = info;
  const dispatch = useDispatch();

  const listOfIngredients = [];
  let count = 0;
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<RecipeCardIngredientItem key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  const hideModal = () => {
    dispatch(removeModal());
  }

  return(
    <>
      <div className='recipe-card modal' onClick={hideModal}>
        <img src={image} alt={`An image of the drink ${name}`} className='recipe-img'></img>
        <div className='information-box'>
          <h3>{name}</h3>
          <p className='content'>{content}</p>
          <p className='glass'>Served in a {glass}</p>
          <ul>
            <h4 className='ingredient-label'>Instructions</h4>
            <li className='ingredients-list'>{instructions}</li>
          </ul>
          <ul>
            <h4 className='ingredient-label'>Ingredients</h4>
            <li className='ingredients-list'>{listOfIngredients}</li>
          </ul>
        </div>
        <div className="card-decoration">&nbsp;</div>
      </div>
      <div className="modal-overlay" onClick={hideModal}></div>
    </>
  )
}