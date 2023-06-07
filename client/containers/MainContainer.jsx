// @description: Contains the app

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BarContainer from './BarContainer.jsx'
import OptionsContainer from './OptionsContainer.jsx';
import CurrentViewContainer from './CurrentViewContainer.jsx';

const MainContainer = () => {
  /* THE HOOKS */
  const dispatch = useDispatch();
  const curState = useSelector(state => state.bar);
  const allIngredients = useSelector(state => state.bar.ingredientSearch);
  const currentMode = useSelector((state) => state.bar.viewMode);

  /* THE CONTENT */
  return(
    <div className='mainContainer'>
      <OptionsContainer dispatch={dispatch} curState = {curState}/>
      <BarContainer/>
      <CurrentViewContainer currentMode={currentMode} allIngredients={allIngredients}/>
    </div>
  )
}

export default MainContainer;