// @description: Contains the app

import React from 'react';
import BarContainer from './BarContainer.jsx'
import OptionsContainer from './OptionsContainer.jsx';
import CurrentViewContainer from './CurrentViewContainer.jsx';

const MainContainer = () => {
  return(
    <div className='mainContainer'>
      <OptionsContainer/>
      <BarContainer/>
      <CurrentViewContainer/>
    </div>
  )
}

export default MainContainer;