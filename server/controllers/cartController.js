const path = require('path');
const fs = require('fs/promises');

const cartController = {};

//method for initializing cart on load gtom the db
cartController.initialCart = (req, res, next) => {

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

cartController.lookupIngredient = async (req, res, next) => {
  const {ingredient} = req.body;
  const newIngredient = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredient}`)
    .then(data => data.json())
    .then(data => data.ingredients[0].strIngredient)
    .catch(err => next({
      log: 'entry not a valid ingredient',
      message: { err: `${err}`}
    }))
  const db = await fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(data => JSON.parse(data))
    .catch(err => next({
      log: 'entry retreiving database',
      message: { err: `${err}`}
    }))
  if (!db[newIngredient]) {
    const extendedIngredient = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${newIngredient}`)
      .then(data => data.json())
      .then(data => {
        const idArray = []; //create array to hold recipe ids
        for (const obj of data.drinks) { //iterate over data array at key drinks
          idArray.push(obj.idDrink) //push id into id array
        }
        db[newIngredient.toUpperCase()] = idArray; //set new ingredient entry in db to ingredient with value ids
        res.locals.newCart = db;
        fs.writeFile(path.resolve(__dirname, '../db/barList.json'),
        JSON.stringify(db), 'UTF-8')
          .then(() => next())
      }) 
  }else {
    //if not return old cart
    res.locals.newCart = 'no change';
    return next()
  }
};

//method for adding an ingredient to the db
cartController.addToCart = (req, res, next) => {
  const {ingredient} = req.body; //sanitize data
  //get database
  fs.readFile(path.resolve(__dirname, '../db/barList.json'))
    .then(db => JSON.parse(db))
    .then(db => {
      //check if entry exists
      if(db[ingredient] === undefined) { //if database does not contain ingredient
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`)
          .then(data => data.json())
          .then(data => {
            const idArray = []; //create array to hold recipe ids
            for (const obj of data.drinks) { //iterate over data array at key drinks
              idArray.push(obj.idDrink) //push id into id array
            }
            db[ingredient.toUpperCase()] = idArray; //set new ingredient entry in db to ingredient with value ids
            res.locals.newCart = db;
            fs.writeFile(path.resolve(__dirname, '../db/barList.json'),
            JSON.stringify(db), 'UTF-8')
              .then(() => next())
          }) 
      } else {
        //if not return old cart
        res.locals.newCart = 'no change';
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