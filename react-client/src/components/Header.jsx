import React from 'react'
import { FaPlus } from 'react-icons/fa';

const Header = (props) => {

  const containerGen = () => {
    let cityContainer = [];

    let result = [];
    props.example.map((city, index) => {
       result.push(
        <div className='subContainer' key={`${index}`} onClick={() => props.switchCity(city.name)}>{city.name}</div>
      );
    })
    cityContainer.push
      (<div className='container'>
        {result}
        <div className='addCity' onClick={() => props.switchView(false)}><FaPlus /></div>
      </div>);
    return cityContainer
  }

  return (
    containerGen()
  )
}

export default Header;