const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

//require routers as developed

//handle parsing body request
app.use(express.json())

//serve static files
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

//define routes

//initial get request for html

/* ERRORS */
//catch-all error handler for unknown requests
app.use((req, res) => res.status(404))

//global error handler
const globalError = app.use((err, req, res) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
      message: { err: 'An error occured'},
  };
  const errorObject = Object.assign(defaultError, err);
  console.log('Error: ', errorObject.log);
  return res.status(errObj.status || 500).json(errObj.message);
})

module.exports = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));