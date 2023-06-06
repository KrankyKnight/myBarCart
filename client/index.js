/*
@module index.js
@description App entry point
*/

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import store from './store';
//styles import

console.log('in index.js')

const root = createRoot(document.getElementById('root'));
console.log('starting');

root.render(
    /*<Provider store={store}>*/
        <App/>
    /*</Provider>*/
)