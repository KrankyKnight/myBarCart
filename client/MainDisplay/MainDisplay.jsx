/**
 * @description Top level container for application
 */

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory from '../containers/Inventory'
import Options from '../containers/Options';
import APIDisplay from '../containers/APIDisplay';
import { updateRecipeListState, updateRecipeList } from '../actions/actions';
import './styles.scss';

const MainDisplay = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.bar.cart);

  const updateRecipeListCall = useCallback(() => {
    fetch('http://localhost:3000/recipes/getRecipeList', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({recipeIdArray: cart}),
    })
      .then(data => data.json())
      .then(data => {
        if(Array.isArray(data)) dispatch(updateRecipeList(data))
        else {
          dispatch(updateRecipeListState('done'));
          console.error(data.err);
        };
      })
      .catch(err => console.error(err));
  }, [cart]);

  useEffect(() => dispatch(updateRecipeListState('done')), []);
  useEffect(() => updateRecipeListCall(), [cart]);

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;