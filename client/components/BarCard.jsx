// @description: A list of all items currently useable for recipe searches

import React from 'react';
import { deleteCard } from '../actions/actions';

const BarCard = ({name, dispatch}) => {

  const deleteCardOnPress = (event) => {
    event.preventDefault();
    const target = document.getElementById(`${name}`)
    fetch('http://localhost:3000/ingredients', {
      method: 'delete',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ ingredient: target.innerHTML}),
    })
    .then(data => data.json())
    .then(data => dispatch(deleteCard(data)))
    .catch(err => console.log(`Error: ${err}`));
  }

  return(
    <li className='barCard'>
      <span id={name}>{name}</span>
      <button onClick={deleteCardOnPress}>-</button>
    </li>
  )
}

export default BarCard;