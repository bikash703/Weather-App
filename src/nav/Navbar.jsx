import React from 'react';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import './nabbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <a href="/"><h2><TiWeatherPartlySunny /> Today Weather</h2></a> 
        </div>
    )
}

export default Navbar
