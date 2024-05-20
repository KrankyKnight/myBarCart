//reminder npx nodemon
import path from 'path';
import express from 'express';
import cors from 'cors';
import ingredientsRouter from './routers/ingredientsRouter.js';
import recipesRouter from './routers/recipesRouter.js';
import dbRouter from './routers/dbRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(NODE_ENV === 'development') {
  app.use(cors({ origin: "http://localhost:8080" }));
};

/* STATIC */

app.use('/', express.static(path.resolve('build', 'client')));

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));