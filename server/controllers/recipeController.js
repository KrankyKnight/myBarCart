const fetch = require('node-fetch');

const recipeController = {

  getRecipes: async (req, res, next) => {
    console.log('getting recipes')
    const {recipeIdArray} = req.body;
    let newRecipeArray = [];

    for(const recipeId of recipeIdArray) {
      await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(recipeIdBuffer => recipeIdBuffer.json())
        .then(recipeIdData => {

          const originalRecipe = recipeIdData.drinks[0];
          const newRecipe = {};
          newRecipe.id = originalRecipe.idDrink;
          newRecipe.name = originalRecipe.strDrink;
          newRecipe.content = "";
          newRecipe.glass = originalRecipe.strGlass;
          newRecipe.instructions = originalRecipe.strInstructions;
          newRecipe.image = originalRecipe.strDrinkThumb;
          newRecipe.ingredients = [];

          for(const key in originalRecipe) {
            const value = originalRecipe[key];
            if(key.substring(0, 13) === 'strIngredient' && value) newRecipe.ingredients.push(value);
          }

          newRecipeArray.push(newRecipe);

        })
        .catch(err => next({
          log: 'Error in recipeController.getRecipes retreiving recipe list',
          status: 500,
          message: { err: err},
        }))
    }

    res.locals.recipeArray = newRecipeArray;

    return next()
  }

};

module.exports = recipeController;