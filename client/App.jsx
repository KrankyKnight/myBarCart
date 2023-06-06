/*
@module App.jsx
@description The base level of the myPantry app 
*/

import React from 'react';
import MainContainer from './containers/MainContainer.jsx';


const App = () => {
  return(
    <div>
      <span>In the app</span>
      <MainContainer/>
    </div>
  );
};

export default App;