import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.get('/', cartController.getAllIngredients, (req, res) => {
  return res.status(200).json(res.locals.ingredientArray);
});

export default router;