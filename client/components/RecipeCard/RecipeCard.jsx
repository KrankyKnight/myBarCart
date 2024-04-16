/**
 * @description Recipe cards
 */

import React from 'react';
import Ingredient from '../Ingredient/Ingredient.jsx';

const RecipeCard = ({ name, content, glass, instructions, image, ingredients }) => {
  
  const listOfIngredients = [];
  let count = 0;
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<Ingredient key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  return(
    <div className='recipeCard'>
      <img src={image} alt={`An image of the drink ${name}`} className='recipeImg'></img>
      <h3>{name}</h3>
      <p className='content'>{content}</p>
      <p className='glass'>Served in a {glass}</p>
      <p className='instructions'><em>Instructions:</em>{instructions}</p>
      <div className='ingredientLabel'>Ingredients</div>
      <div className='ingredientsList'>{listOfIngredients}</div>
    </div>
  )
}

export default RecipeCard;