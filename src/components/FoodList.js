import React from 'react'
import { trim } from '../utils/helpers'

function FoodList ({ food, onSelect }) {
  if (food.length === 0)
    return <p>You search has 0 results.</p>

  return (
    <ul className='food-list'>
      {food.map((item, index) => (
        <li key={index} onClick={() => onSelect(item)}>
          <h3>{trim(item.label)}</h3>
          <img src={item.image} alt={item.label} />
          <div>{Math.floor(item.calories)} Calories</div>
          <div>{item.source}</div>
        </li>
      ))}
    </ul>
  )
}

export default FoodList
