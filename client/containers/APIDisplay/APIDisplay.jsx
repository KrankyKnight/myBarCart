/**
 * @description display ingredients or recipes after a lookup
 */

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import IngredientLookupCard from '../../components/IngredientLookupCard';
import './styles.scss';

//display must be rendered based on a state
const APIDisplay = () => {

  const ingredientList = useSelector((state) => state.bar.ingredientList);
  const filteredIngredientList = useSelector((state) => state.bar.filteredIngredientList);
  const searchText = useSelector((state) => state.bar.searchText);
  const viewMode = useSelector((state) => state.bar.viewMode);
  const recipes = useSelector((state) => state.bar.recipes);

  const viewOutput = [];
  let ingredientCount = 0;

  if(viewMode === 'ingredients'){
    if(searchText.length === 0) {
      for(const ingredient of ingredientList) {
        ingredientCount++;
        viewOutput.push(<IngredientLookupCard key={`ingredient${ingredientCount}`} ingredientID={ingredient.id} displayName={ingredient.displayName}/>)
      };
    }
    else {
      for(const ingredient of filteredIngredientList) {
        ingredientCount++;
        viewOutput.push(<IngredientLookupCard key={`ingredient${ingredientCount}`} ingredientID={ingredient.id} displayName={ingredient.displayName}/>)
      };
    };
  };

  const recipeCards = [];
  let recipeCount = 0;

  if(viewMode === 'recipes' && recipes.length){
    for(let recipe of recipes) {
      const { id, name, content, glass, instructions, image, ingredients } = recipe;
      recipeCount++;
      recipeCards.push(<RecipeCard key={`recipe${recipeCount}`} id={id} name={name} content={content} glass={glass} instructions={instructions} image={image} ingredients={ingredients}/>)
    };
  };

  return(
    <div id='APIDisplay' className={`api ${viewMode}`}>
      {
        viewMode === 'none' ? 
          <p>
            <h4>Welcome to myBarCart</h4> 
            <div>This app brought to you thanks to the wonderful devs at <em>thecocktailDB</em></div>
            <div>Visit their website at <a href='https://www.thecocktaildb.com/'>www.thecocktaildb.com/</a></div>
            <div>And support them on their patreon at <a href='https://www.patreon.com/thedatadb'>www.patreon.com/thedatadb</a></div>
          </p>
        : viewMode === 'ingredients' ? 
          <ul id='ingredientList'>
            {viewOutput}
          </ul>
        :viewMode === 'recipes' && recipes === 'pending' ? 
          <span className='blurb'>Fetching your recipes...</span>
        :viewMode === 'recipes' && !recipes.length ?
          <span className='blurb'>Sadly there are no recipes in the database that you have all the ingredients for. Time to go shopping... or do shots. No judgement.</span>
        :viewMode === 'error' && !recipes.length ?
          <span className='blurb'>There was an error contacting the server... shots?</span>
        :viewMode === 'recipes' && recipes.length ? 
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