import React from 'react';
import './styles.scss';

export const RecipeCardIngredientItem = ({ingredient}) => {
  return (
    <div>
      &#x2022; {ingredient}
    </div>
  )
};