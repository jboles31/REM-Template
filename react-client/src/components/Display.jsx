import React from 'react'
import { useState } from 'react'

const Display = ( props ) => {
  
  let [search, updateSearch] = useState('')
  
  return (
    <div className='display'>
    <div className='greeting'>
      <i className="fa fa-globe"></i>
    </div>
    <div className='search'> 
      <input className='search-bar' type='search' onChange={(e) => updateSearch(e.target.value)}></input>
      <button type="submit" className="search-button" onClick={() => props.search(search)}>
      <i className="fa fa-search"></i>
    </button>
    </div>
  </div>
  )
}

export default Display