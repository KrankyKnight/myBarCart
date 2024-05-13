import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import App from './components/App/index.js';
import store from './store.js';

const domNode = document.getElementById('root')
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <App key='App'/>
    </Provider>
)