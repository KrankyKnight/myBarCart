//reminder npx nodemon
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

const ingredientsRouter = require('./routers/ingredientsRouter.js');
const recipesRouter = require('./routers/recipesRouter.js');
const dbRouter = require('./routers/dbRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(NODE_ENV === 'development') {
  app.use(cors({ origin: "http://localhost:8080" }));
};

/* STATIC */

app.use('/', express.static(path.join(__dirname, '../build')));

/* ROUTING */

app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/db', dbRouter);

/* ERROR HANDLING */

app.use('*', (req, res) => res.status(404));

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: {err: "An error occurred"},
  };
  const errorObject = Object.assign({}, defaultError, err);
  console.log('Error Log: ', errorObject.log);
  return res.status(errorObject.status || 500).json(errorObject.message);
});

module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));