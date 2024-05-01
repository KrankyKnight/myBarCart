import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import MainDisplay from './MainDisplay';
import store from './store.js';
import './scss/styles.scss';

const domNode = document.getElementById('root')
const root = createRoot(domNode);

root.render(
    <Provider store={store}>
        <MainDisplay key='MainDisplay'/>
    </Provider>
)