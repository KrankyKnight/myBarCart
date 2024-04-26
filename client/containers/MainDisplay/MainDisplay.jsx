/**
 * @description main container for display
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Inventory from '../Inventory'
import Options from '../Options';
import APIDisplay from '../APIDisplay';
import { updateRecipeListState, updateRecipeList } from '../../actions/actions';
import './styles.scss';

const MainDisplay = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.bar.cart);
  const recipeList = useSelector(state => state.bar.recipeList);

  useEffect(() => dispatch(updateRecipeListState('done')), []);
  useEffect(() => {
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
  }, [cart])

  return(
    <div id='MainDisplay' className='displayGrid'>
      <Options key='Options'/>
      <Inventory key='Inventory'/>
      <APIDisplay key='APIDisplay'/>
    </div>
  );
};

export default MainDisplay;