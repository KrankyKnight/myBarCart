// @description: Cards generated from a recipe lookup

import React from 'react';
import Ingredient from './Ingredient.jsx';

const RecipeCard = ({ name, content, glass, instructions, image, ingredients }) => {
  
  const listOfIngredients = [];
  let count = 0;
  // console.log('ingredients', ingredients)
  for (let ingredient of ingredients) {
    count++;
    listOfIngredients.push(<Ingredient key={`ingredient${name}${count}`} ingredient={ingredient}/>)
  }

  return(
    <div>
      <img src={image} alt={`An image of the drink ${name}`}></img>
      <h3>{name}</h3>
      <p>{content}</p>
      <p>Served in a {glass}</p>
      <p>Instructions: {instructions}</p>
      {listOfIngredients}
    </div>
  )
}

export default RecipeCard;