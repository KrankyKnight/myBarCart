const path = require('path');
const fs = require('fs/promises');
const fetch = require('node-fetch');

const recipeController = {};

const ingredientCheck = (fullRecipe, cart) => {
  const recipe = fullRecipe.drinks[0]; //retreive inner object recipe from returned recipe data
  const ingredientArray = [] //create return array of ingredients to reference for next helper 
  for(let i = 1; i <= 15; i++) { //iterate through ingredient list of recipe
    let ingredientKey = `strIngredient${i}`;
    let measureKey = `strMeasure${i}`; 
    if(recipe[ingredientKey] === null) { //if null all ingredients checked -> passed
      return [true, ingredientArray];
    }
    if(cart[recipe[ingredientKey].toUpperCase()] === undefined) { //if ingredient is undefined -> failed
      return [false, []];
    }
    if(recipe[measureKey]) { //check for measurements
      ingredientArray.push(recipe[ingredientKey] + ': ' + recipe[measureKey])
    }
    else ingredientArray.push(recipe[ingredientKey])
  }
  return [true, ingredientArray];
}

const cleanupRecipe = (fullrecipe, checkResult) => {
  const {idDrink, strDrink, strAlcoholic, strGlass, strInstructions, strDrinkThumb} = fullrecipe.drinks[0];
  const newRecipe = {
    id: idDrink,
    name: strDrink,
    content: strAlcoholic,
    glass: strGlass,
    instructions: strInstructions,
    image: strDrinkThumb,
    ingredients: checkResult[1],
  }
  return newRecipe;
}

recipeController.getRecipes = async (req, res, next) => {
  const cache = await fs.readFile(path.resolve(__dirname, '../db/recipeList.json'))
    .then(data => JSON.parse(data));

  if(cache["cached"]) {
    res.locals.recipes = cache["recipes"];
    return next();
  }
  
  const db = await fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data));

  const idSet = new Set();

  for (const ingredient in db) {
    for(const id of db[ingredient]) {
      idSet.add(id);
    }
  }

  const successArray = []

  for(const id of idSet) {
    console.log('fetching' + id);
    const fullRecipe = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(data => data.json())
    const testResult = ingredientCheck(fullRecipe, db)
    let newRecipe;
    if (testResult[0]) {
      newRecipe = cleanupRecipe(fullRecipe, testResult);
      successArray.push(newRecipe);
    }
  }

  if(successArray.length === 0) {
    res.locals.recipes = 'no results';
    return next();
  }
  else {
    try{
      await fs.writeFile(path.resolve(__dirname, '../db/recipeList.json'),
        JSON.stringify({"cached":true,"recipes":[...successArray]}), 
        'UTF-8');
      res.locals.recipes = successArray;
      return next()
    } catch(err) {
      return next({
        log: 'Error updating recipeList cache db',
        status: 500,
        message: { err: err },
      });
    };
  };
};

recipeController.resetCache = async (req, res, next) => {
  try{
    await fs.writeFile(path.resolve(__dirname, '../db/recipeList.json'),
      JSON.stringify({"cached":false,"recipes":[]}), 
      'UTF-8');
    return next();
  } catch(err) {
    return next({
      log: 'Error updating recipeList cache db',
      status: 500,
      message: { err: err },
    });
  };
};

module.exports = recipeController;