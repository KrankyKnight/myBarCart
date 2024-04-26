const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController.js');
const recipeController = require('../controllers/recipeController.js');

router.post('/getRecipeList', cartController.filterRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipeIdList);
})

router.post('/getRecipes', recipeController.getRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipeArray);
})

module.exports = router;