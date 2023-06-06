// @description: Contains the app

import React from 'react';
import ContentContainer from './ContentContainer.jsx';
import Options from '../components/Options.jsx';

const MainContainer = () => {
  return(
    <>
      <h1>myPantry</h1>
      <Options/>
      <ContentContainer/>
    </>
  )
}

export default MainContainer;