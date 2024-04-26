const path = require('path');
const fs = require('fs/promises');
const db = require('../db/model');

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
    const result = await db.query('SELECT * FROM ingredients')
      .then(data => data[0])
      .catch(err => next({
        log: 'Error retreiving ingredients from database',
        status: 500,
        message: { err: err},
      }))
    res.locals.ingredientArray = result;
    return next();
  }
};

module.exports = cartController;