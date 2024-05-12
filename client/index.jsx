import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from './App/index.js';
import store from './store.js';
import './scss/styles.scss';

const domNode = document.getElementById('root')
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App key='App'/>
    </Provider>
)