const cartController = {};
const path = require('path');
const fs = require('fs/promises');

cartController.initialCart = (req, res, next) => {
  // console.log('in initial cart');
  fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data))
    .then(data => {
      res.locals.newCart = data;
      return next();
    })
    .catch(err => next({
      log: 'An error occured retreiving intial cart',
      message: { err: `${err}`},
    }))
}

cartController.addToCart = (req, res, next) => {
  const {ingredient} = req.body;
  //get database
  fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data))
    .then(data => {
      //check if entry exists
      if(data[ingredient] === undefined) {
        //if not add entry and update database
        data[ingredient] = [];
        res.locals.newCart = data;
        fs.writeFile(path.resolve(__dirname, '../db/barList.json'),
        JSON.stringify(data), 'UTF-8')
        .then(data => next())
      } else {
        //if not return old cart
        res.locals.newCart = data;
        return next()
      }
    })
    .catch(err => next({
      log: 'An error occured writing to the database',
      message: { err: `${err}`},
    }))
}

module.exports = cartController;