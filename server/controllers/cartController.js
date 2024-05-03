const path = require('path');
const fs = require('fs/promises');
const db = require('../db/model');

const cartController = {
  filterRecipes: async (req, res, next) => {
    const {recipeIdArray} = req.body;

    if(!recipeIdArray.length) {
      console.log('triggered');
      return next({
        log: 'No ingredients provided to cartController.filterRecipes',
        status: 500,
        message: {err: `No Ingredients Sent`},
      });
    };

    let list = '(';
    for(const ingredient in recipeIdArray) {
      if(ingredient !== 'length') {
        list += `${recipeIdArray[ingredient]},`
      };
    };
    list = list.slice(0, -1) + ')';

    let query = `
      SELECT iR.recipeID, count(iR.recipeId) AS total, rTI.totalIngredients
      FROM idRecipes iR
      INNER JOIN recipeTotalIngredients rTI
      ON iR.recipeID = rTI.recipeID
      WHERE iR.id IN ${list}
      GROUP BY recipeId
      HAVING total = rTI.totalIngredients;
    `;
    
    const result = await db.query(query)
      .then(data => data[0])
      .catch(err => next({
        log: 'Error retreiving recipes from database in cartController.filterRecipes',
        status: 500,
        message: {err: `${err}`},
      }));
    
    if(result === undefined) res.locals.recipeIdList = [];
    else {
      const recipeIdList = [];
      for(const recipe of result) {
        recipeIdList.push(recipe.recipeID);
      }
      res.locals.recipeIdList = recipeIdList;
    }

    return next();
  },

  getAllIngredients: async (req, res, next) => {
    const result = await db.query('SELECT * FROM ingredients')
      .then(data => data[0])
      .catch(err => next({
        log: 'Error retreiving ingredients from database in cartController.getAllIngredients',
        status: 500,
        message: {err: `${err}`},
      }))
    res.locals.ingredientArray = result;
    return next();
  }
};

module.exports = cartController;