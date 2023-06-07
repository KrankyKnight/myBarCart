// @description: displays the ingredients from a lookup or recipes

import React from 'react';
import { useSelector  } from 'react-redux';
import RecipeCard from '../components/RecipeCard.jsx';
import IngredientCard from '../components/IngredientCard.jsx';

//display must be rendered based on a state
const CurrentViewContainer = ({currentMode, allIngredients}) => {

  //mode none
  if( currentMode === 'none') {
    return(
      <div className='view'>
        No data
    </div>
    )
  } 
  //mode for viewing ingredients
  else if ( currentMode === 'ingredients' ) {
    const viewOutput = [];
    let count = 0;
    for(const ingredient of allIngredients) {
      count++;
      viewOutput.push(<IngredientCard key={`ingredient${count}`} name={ingredient}/>)
    }
    return (
     <div className='view'>
        {viewOutput}
      </div>
    )
  } 
  
  //mode for viewing recipes
  else if (currentMode === 'recipes') {
    return (
      <div className='view'>
         <RecipeCard/>
       </div>
     ) 
  }
}

export default CurrentViewContainer;