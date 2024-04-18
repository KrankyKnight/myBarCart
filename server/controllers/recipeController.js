const fetch = require('node-fetch');

const recipeController = {

  updateTotalIngredientsPerRecipeRef: async (req, res, next) => {

    const {ingredient, totalIngredientsPerRecipeRef} = req.body;
    const {newIngredientEntry} = res.locals;

    if(newIngredientEntry[ingredient].length){
      for(const recipeId of newIngredientEntry[ingredient]) {
        if(totalIngredientsPerRecipeRef[recipeId] === undefined) {
          await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
            .then(fullRecipeBuffer => fullRecipeBuffer.json())
            .then(fullRecipeData => {
              let count = 0;
              for(const key in fullRecipeData.drinks[0]) {
                if(key.substring(0, 13) === 'strIngredient'
                  && fullRecipeData.drinks[0][key]) {
                    count++
                };
              };
              totalIngredientsPerRecipeRef[recipeId] = count;
            })
            .catch(err => next({
              log: 'Error in cartController.addToCart retreiving full recipe data',
              status: 500,
              message: { err: err},
            }));
        }
      };
    };

    res.locals.totalIngredientsPerRecipeRef = totalIngredientsPerRecipeRef;

    return next();
  },

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
    // id, name, content, glass, instructions, image, ingredients
    res.locals.recipeArray = newRecipeArray;

    return next()
  }

};

module.exports = recipeController;