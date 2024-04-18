const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController.js');

router.post('/', recipeController.getRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipeArray);
})

module.exports = router;