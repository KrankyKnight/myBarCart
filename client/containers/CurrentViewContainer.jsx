// @description: displays the ingredients from a lookup or recipes

import React from 'react';
import { useSelector  } from 'react-redux';
import RecipeCard from '../components/RecipeCard.jsx';
import IngredientCard from '../components/IngredientCard.jsx';

//display must be rendered based on a state
const CurrentViewContainer = ({currentMode, allIngredients, dispatch, recipes}) => {

  //mode none
  if( currentMode === 'none') {
    return(
      <div className='view'>
        Welcome to myBarCart
    </div>
    )
  } 
  //mode for viewing ingredients
  else if ( currentMode === 'ingredients' ) {
    const viewOutput = [];
    let count = 0;
    for(const ingredient of allIngredients) {
      count++;
      viewOutput.push(<IngredientCard key={`ingredient${count}`} name={ingredient} dispatch={dispatch}/>)
    }
    return (
     <div className={`view ${currentMode}`}>
        {viewOutput}
      </div>
    )
  } 
  
  //mode for viewing recipes
  else if (currentMode === 'recipes') {
    //display while waiting for results
    if(recipes === 'pending') {
      return(
        <div className={`view ${currentMode}`}>
          Fetching your recipes. Please be patient, API's are expensive and I am cheap. Pinging one... alot.
        </div>
      )
    } 
    //the database returned no recipes
    else if (recipes.length === 0) {
      return(
        <div className={`view ${currentMode}`}>
          Sadly there are no recipes in the database that fully contain your cart. Time to go shopping... or do shots. No judgement.
        </div>
      )
    } 
    //the database returned some recipes
    else if (recipes.length !== 0) {
      const recipeCards = [];
      let count = 0;
      console.log('recipes', recipes)
      for(let recipe of recipes) {
        console.log(recipe);
        const { id, name, content, glass, instructions, image, ingredients } = recipe;
        count++;
        recipeCards.push(<RecipeCard key={`recipe${count}`} id={id} name={name} content={content} glass={glass} instructions={instructions} image={image} ingredients={ingredients}/>)
      }

      return(
        <div className={`view ${currentMode}`}>
          {recipeCards}
        </div>
      )
    } 
    //an errror occurred
    else {
      return(
        <div className='view'>
          Something is not right... good luck code man!
       </div>
      )
    }

  }
  return (
    <div className='view'>
       This should not be displaying. Shhh... don't tell anyone...
     </div>
   ) 
}

export default CurrentViewContainer;