// @description: The main view window that displays ingredients or recipes and displays the pantry list

import React from 'react';
import BarCard from '../components/BarCard.jsx';

const ContentContainer = () => {
  return(
    <div className='bar'>
      <BarCard/>
    </div>
  )
}

export default ContentContainer;