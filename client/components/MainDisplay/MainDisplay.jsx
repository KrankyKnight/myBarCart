/**
 * @description display ingredients or recipes after a lookup
 */

import React from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard';
import IngredientLookupCard from '../IngredientLookupCard';
import './styles.scss';

export const MainDisplay = () => {

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
    <div id='MainDisplay' className={`api ${viewMode}`}>
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
          <div className='blurb'>
            <span className='info-text'>Fetching your recipes...</span>
          </div>
        :viewMode === 'recipes' && !recipes.length ?
          <div className='blurb'>
            <span className='info-text'>Sadly there are no recipes in the database that you have all the ingredients for. Time to go shopping... or do shots. No judgement.</span>
          </div>
        :viewMode === 'error' && !recipes.length ?
          <div className='blurb'>
            <span className='info-text'>There was an error contacting the server... shots?</span>
          </div>
        :viewMode === 'recipes' && recipes.length ? 
          recipeCards
        :
          <div className='blurb'>
            <div className='info-text'>To the user! You found me! The message that means something weird broke! Congratulations and sorry for the invonvenience!</div>
            <div className='info-text'>To the dev: Something is not right and good luck code man!</div>
          </div>
      }
    </div>
  );
};