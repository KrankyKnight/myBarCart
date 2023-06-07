// @description: Contains the app

import React from 'react';
import ContentContainer from './ContentContainer.jsx';
import Options from '../components/Options.jsx';

const MainContainer = () => {
  return(
    <div className='container'>
      <Options/>
      <ContentContainer/>
    </div>
  )
}

export default MainContainer;