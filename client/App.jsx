import React from 'react';
import MainDisplay from './containers/MainDisplay';
import './scss/styles.scss'

const App = () => {
  return(
    <div id='App'>
      <MainDisplay key='MainDisplay'/>
    </div>
  );
};

export default App;