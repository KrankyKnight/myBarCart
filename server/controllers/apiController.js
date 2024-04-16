const fetch = require('node-fetch');

const apiController = {}

apiController.getAllIngredients = (req, res, next) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then(data => data.json())
    .then(data => {
      res.locals.allIngredients = data
      next();
    })
    .catch(err => {
      next({
      log: 'Error in fetch request to TheCocktailDB API',
      status: 400,
      message: { err: `${err}`},
    });
  });
};

module.exports = apiController;