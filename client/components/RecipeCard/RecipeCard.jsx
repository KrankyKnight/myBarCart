/**
 * @description Recipe cards
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { RecipeCardIngredientItem } from '../RecipeCardIngredientItem/RecipeCardIngredientItem.jsx';
import { displayModal } from '../../actions/actions.js'
import './styles.scss';

export const RecipeCard = (props) => {

  const { name, content, glass, instructions, image, ingredients } = props;
  const dispatch = useDispatch();

  const listOfIngredients = [];
  let count = 0;
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<RecipeCardIngredientItem key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  const showModal = () => {
    dispatch(displayModal(props));
  }

  return(
    <div className='recipeCard' onClick={showModal}>
      <img src={image} alt={`An image of the drink ${name}`} className='recipeImg'></img>
      <div className='informationBox'>
        <h3>{name}</h3>
        <p className='content'>{content}</p>
        <p className='glass'>Served in a {glass}</p>
        <ul>
          <h4 className='ingredientLabel'>Instructions</h4>
          <li className='ingredientsList'>{instructions}</li>
        </ul>
        <ul>
          <h4 className='ingredientLabel'>Ingredients</h4>
          <li className='ingredientsList'>{listOfIngredients}</li>
        </ul>
      </div>
      <div className="cardDecoration">&nbsp;</div>
    </div>
  )
}