import db from '../db/model.js';

const dbController = {

  testConnection: async (req, res, next) => {
    await db.test()
      .then(data => {
        res.locals.dbTest = data[0];
        if(data[1]) {
          return next({
            log: 'Express error handler caught error testing database connection in dbController.testConnection',
            status: 503,
            message: {err: `${data[1]}`},
          })
        }
        return next();
      })
      .catch(err => next({
        log: 'Express error handler caught error testing database connection in dbController.testConnection',
        status: 500,
        message: {err: `${err}`},
      }));
  }
}

export default dbController;