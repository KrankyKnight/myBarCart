//reminder npx nodemon
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//require routers as developed
console.log('in router')

//handle parsing body request
app.use(express.json())

//serve static files from build
app.use('/', express.static(path.join(__dirname, '../build')));

//serve static files if build request fails
app.get('/', (req, res) => {
  console.log('in base request')
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
})

app.use('/ingredients', (req, res) => {
  return res.status(200).json({});
})


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