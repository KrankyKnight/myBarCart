/**
 * @description Recipe cards
 */

import React from 'react';
import { RecipeCardIngredientItem } from '../RecipeCardIngredientItem/RecipeCardIngredientItem.jsx';
import './styles.scss';

const RecipeCard = ({ name, content, glass, instructions, image, ingredients }) => {
  
  const listOfIngredients = [];
  let count = 0;
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<RecipeCardIngredientItem key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  return(
    <div className='recipeCard'>
      <img src={image} alt={`An image of the drink ${name}`} className='recipeImg'></img>
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
  )
}

export default RecipeCard;