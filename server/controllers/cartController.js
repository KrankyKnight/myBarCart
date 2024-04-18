const path = require('path');
const fs = require('fs/promises');

const cartController = {
  addToCart: async (req, res, next) => {
    const {ingredient} = req.body;

    let ingredientData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(ingredientBuffer => ingredientBuffer.json())
      .catch(err => console.log('ingredient error'));
    
    const newIngredientEntry = {[ingredient]: []};

    if(ingredientData === undefined) ingredientData = {drinks:[]};
    for(const drink of ingredientData.drinks) {
      newIngredientEntry[ingredient].push(drink.idDrink);
    };
    
    res.locals.newIngredientEntry = newIngredientEntry;

    return next()
  },

  getAllIngredients: async (req, res, next) => {
    const ingredientList = await fs.readFile(path.resolve(__dirname, '../db/ingredientList.json'))
      .then(ingredientBuffer => JSON.parse(ingredientBuffer))
      .catch(err => next({
        log: 'Error in cartController.getAllIngredients retreiving ingredient list',
        status: 500,
        message: { err: err},
      }));
    const ingredientArray = Object.values(ingredientList).sort();
    res.locals.ingredientArray = ingredientArray;
    return next()
  }
};

module.exports = cartController;