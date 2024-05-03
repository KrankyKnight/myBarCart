const db = require('../db/model');

const dbController = {

  testConnection: async (req, res, next) => {
    await db.test()
      .then(data => {
        res.locals.dbTest = data;
        return next()
      })
      .catch(err => next({
        log: 'Express error handler caught error testing database connection in dbController.testConnection',
        status: 500,
        message: { err: `${err}`},
      }))
  }
}

module.exports = dbController;