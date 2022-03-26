import React from 'react';
import './styles.css';

import logo from './retro.png';

function Navigation() {
  return (
    <div className="navigation">
     <img 
      src={logo} 
      alt="retrotubing logo"
      style={{ height: 50, width: 350, 
        margin: 30  }}
      
    />
    </div>
  )
}

export default Navigation;