// @description: The main view window that displays ingredients or recipes and displays the pantry list

import React from 'react';
import Pantry from '../components/Pantry.jsx';
import CurrentViewContainer from './CurrentViewContainer.jsx';

const ContentContainer = () => {
  return(
    <div className='container content flexContent'>
      <Pantry/>
      <CurrentViewContainer/>
    </div>
  )
}

export default ContentContainer;