import express from 'express';
import cartController from '../controllers/cartController.js';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.post('/getRecipeList', cartController.filterRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipeIdList);
})

router.post('/getRecipes', recipeController.getRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipeArray);
})

export default router;