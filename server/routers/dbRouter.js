const express = require('express');
const router = express.Router();

const dbController = require('../controllers/dbController');

router.get('/', dbController.testConnection, (req, res) => {
  res.status(200).json(res.locals.dbTest);
});

module.exports = router;