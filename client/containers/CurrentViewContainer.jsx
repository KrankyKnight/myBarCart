// @description: displays the ingredients from a lookup or recipes

import React from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import IngredientCard from '../components/IngredientCard.jsx';

//display must be rendered based on a state
const CurrentViewContainer = () => {
  return (
    <div className='container view'>
      <IngredientCard/>
    </div>
  )
}

export default CurrentViewContainer;