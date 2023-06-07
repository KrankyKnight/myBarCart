const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js')

router.get('/', apiController.getAllIngredients, (req, res) => {
  console.log('in ingredients router');
  return res.status(200).json(res.locals.allIngredients);
})

module.exports = router;