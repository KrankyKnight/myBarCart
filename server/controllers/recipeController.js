const path = require('path');
const fs = require('fs/promises');
const fetch = require('node-fetch');

const recipeController = {};

const ingredientCheck = (fullRecipe, cart) => {
  const recipe = fullRecipe.drinks[0]; //retreive inner object recipe from returned recipe data
  const ingredientArray = [] //create return array of ingredients to reference for next helper 
  for(let i = 1; i <= 15; i++) { //iterate through ingredient list of recipe
    let ingredientKey = `strIngredient${i}`;
    console.log('here', recipe[ingredientKey], cart[recipe[ingredientKey]])
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
  //get the database
  // console.log('retreiving database');
  const db = await fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data))
  // console.log('database retreived: ', db);

  //create a set to get the unique ids
  const idSet = new Set();

  //create list of unique ID's
  // console.log('generating set')
  for (const ingredient in db) {
    for(const id of db[ingredient]) {
      idSet.add(id);
    }
  }
  // console.log('set generated: ', idSet);

  //a  place to store recipes that pass the test
  const successArray = []

  //iterate over set
  for(const id of idSet) {
    console.log('entering for loop for id# ', id);
    console.log('fetching recipe');
    const fullRecipe = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(data => data.json())
    // console.log('recipe retreived: ', fullRecipe);
    const testResult = ingredientCheck(fullRecipe, db)
    console.log('test in for loop', testResult)
    let newRecipe;
    if (testResult[0]) {
      newRecipe = cleanupRecipe(fullRecipe, testResult);
      successArray.push(newRecipe);
    }
  }

  console.log('list of passed recipes', successArray);
  if(successArray.length === 0) res.locals.recipes = 'no results';
  else res.locals.recipes = successArray;
  next();
}

module.exports = recipeController;

// const test = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
// .then(data => data.json())
// .then(data => data.drinks[0])
// console.log('test!!!!!', test);