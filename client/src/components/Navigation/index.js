import React from 'react';
import './styles.css';

import logo from './retrotubing_logo.png';

function Navigation() {
  return (
    <div className="navigation">
     <img 
      src={logo} 
      alt="retrotubing logo"
      style={{ height: 50, width: 200, 
        margin: 30  }}
      
    />
    </div>
  )
}

export default Navigation;