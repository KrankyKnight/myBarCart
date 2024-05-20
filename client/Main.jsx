import React from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './components/App';

export const Main = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>myBarCartDB</title>
        <link href="main.css" rel="stylesheet"></link>
      </head>
      <body>
        <div id="root">
          <Provider store={store}>
            <App key='App'/>
          </Provider>
        </div>
      </body>
    </html>
  )
};