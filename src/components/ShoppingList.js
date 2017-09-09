import React from 'react'

function ShoppingList ({ list }) {
  return (
    <div className='ingredients-list'>
      <h3 className='subheader'>
        Your Shopping List
      </h3>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ShoppingList
