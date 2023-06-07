// @description: Cards for ingredient selection

import React from 'react';

const IngredientCard = ({name}) => {
  return(
    <div className='ingredientCard'>
      {name}
    </div>
  )
}

export default IngredientCard;