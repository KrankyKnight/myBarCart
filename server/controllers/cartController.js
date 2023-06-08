const cartController = {};
const path = require('path');
const fs = require('fs/promises');

//method for initializing cart on load gtom the db
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

//method for adding an ingredient to the db
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
          .then(() => next())
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

// method for removing an item from the db
cartController.deleteCard = (req, res, next) => {
  const {ingredient} = req.body;
  console.log('PING!!', ingredient)
  fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data))
    .then(data => {
      if(data[ingredient] === undefined) {
        return next({
          log: 'No item with the passed in name exists in the db'
        })
      }
      delete data[ingredient]
      res.locals.newCart = data;
      fs.writeFile(path.resolve(__dirname, '../db/barList.json'),
      JSON.stringify(data), 'UTF-8')
        .then(() => next())
    })
    .catch(err => next({
      log: 'An error occured deleting an item from the database',
      message: { err: `${err}`},
    }))
}

module.exports = cartController;