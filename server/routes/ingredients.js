const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js')
const cartController = require('../controllers/cartController.js')

router.get('/initialCart', cartController.initialCart, (req, res) => {
  return res.status(200).json(res.locals.newCart);
})

router.get('/', apiController.getAllIngredients, (req, res) => {
  console.log('in ingredients router');
  return res.status(200).json(res.locals.allIngredients);
})

router.post('/', cartController.addToCart, (req, res) => {
  return res.status(200).json(res.locals.newCart);
})

module.exports = router;