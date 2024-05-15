/**
 * @description Recipe cards
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { RecipeCardIngredientItem } from '../RecipeCardIngredientItem/RecipeCardIngredientItem.jsx';
import { modalOn, setRecipeModal } from '../../actions/actions.js'
import './styles.scss';

export const RecipeCard = (props) => {

  const { name, content, image, ingredients } = props;
  const dispatch = useDispatch();

  const listOfIngredients = [];
  let count = 0;
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<RecipeCardIngredientItem key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  const showModal = () => {
    dispatch(modalOn('recipe'));
    dispatch(setRecipeModal(props));
  }

  return(
    <div className='recipeCard' onClick={showModal}>
      <img src={image} alt={`An image of the drink ${name}`} className='recipeImg'></img>
      <div className='informationBox'>
        <h3 className='recipe-name'>{name}</h3>
        <p className='content'>{content}</p>
        <h4 className='ingredient-label'>Ingredients</h4>
        <ol className='recipe-list'>
          <li className='ingredientsList'>{listOfIngredients}</li>
        </ol>
      </div>
      <div className='click-info'>Click for full recipe</div>
      <div className="cardDecoration">&nbsp;</div>
    </div>
  )
}