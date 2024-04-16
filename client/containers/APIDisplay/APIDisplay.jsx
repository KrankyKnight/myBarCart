/**
 * @description display ingredients or recipes after a lookup
 */

import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import IngredientLookupCard from '../../components/IngredientLookupCard';

//display must be rendered based on a state
const APIDisplay = () => {

  const allIngredients = useSelector((state) => state.bar.ingredientSearch);
  const currentMode = useSelector((state) => state.bar.viewMode);
  const recipes = useSelector((state) => state.bar.recipes);

  const viewOutput = [];
  let ingredientCount = 0;
  if(currentMode === 'ingredients'){
    for(const ingredient of allIngredients) {
      ingredientCount++;
      viewOutput.push(<IngredientLookupCard key={`ingredient${ingredientCount}`} name={ingredient}/>)
    };
  };

  const recipeCards = [];
  let recipeCount = 0;
  if(currentMode === 'recipes' && recipes.length){
    for(let recipe of recipes) {
      console.log(recipe);
      const { id, name, content, glass, instructions, image, ingredients } = recipe;
      recipeCount++;
      recipeCards.push(<RecipeCard key={`recipe${recipeCount}`} id={id} name={name} content={content} glass={glass} instructions={instructions} image={image} ingredients={ingredients}/>)
    };
  };

  return(
    <div id='APIDisplay'>
      {currentMode === 'none' ? 
        <span className='blurb'>Welcome to myBarCart <br/><br/> This app brought to use through the loving abuse of the <em>thecocktailDB</em> API's free content</span>
      : currentMode === 'ingredients' ? 
        viewOutput
      :currentMode === 'recipes' && recipes === 'pending' ? 
        <span className='blurb'>Fetching your recipes. Please be patient, API's are expensive and I am cheap. Pinging one... alot.</span>
      :currentMode === 'recipes' && !recipes.length ?
        <span className='blurb'>Sadly there are no recipes in the database that fully contain your cart. Time to go shopping... or do shots. No judgement.</span>
      :currentMode === 'recipes' && recipes.length ? 
        recipeCards
      :
        <div>
          <span className='blurb'>This should not be displaying. Shhh... don't tell anyone...</span>
          <span className='blurb'>Something is not right... good luck code man!</span>
        </div>
      }

    </div>
  );
};

export default APIDisplay;