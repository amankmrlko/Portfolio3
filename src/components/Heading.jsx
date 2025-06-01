import React from 'react'

function Heading({ title, subtitle }) {
  return (
    <div>
        <div className="Main-heading">
            <h1 className='white-text'>{title}</h1>
            <p className='gray-text'>{subtitle}</p>
        </div>
    </div>
  )
}

export default Heading