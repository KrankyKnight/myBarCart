import express from 'express';
import dbController from '../controllers/dbController.js';

const router = express.Router();

router.get('/', dbController.testConnection, (req, res) => {
  res.status(200).json(res.locals.dbTest);
});

export default router;