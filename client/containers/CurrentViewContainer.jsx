// @description: displays the ingredients from a lookup or recipes

import React from 'react';
import { useSelector  } from 'react-redux';
import RecipeCard from '../components/RecipeCard.jsx';
import IngredientCard from '../components/IngredientCard.jsx';

//display must be rendered based on a state
const CurrentViewContainer = () => {

  //set the view with useSelector hook
  const currentMode = useSelector((state) => state.bar.viewMode)
  console.log('currentMode', currentMode);

  //mode none
  if( currentMode === 'none') {
    return(
      <div className='view'>
        No data
    </div>
    )
  } else if ( currentMode === 'ingredients' ) {
    return (
     <div className='view'>
        <IngredientCard/>
      </div>
    )
  } else if (currentMode === 'recipes') {
    return (
      <div className='view'>
         <RecipeCard/>
       </div>
     ) 
  }
}

export default CurrentViewContainer;