const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController.js');
const recipeController = require('../controllers/recipeController.js');

//UPDATED
router.get('/', cartController.getAllIngredients, (req, res) => {
  return res.status(200).json(res.locals.ingredientArray);
});

module.exports = router;