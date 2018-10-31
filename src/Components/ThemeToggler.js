import React from 'react';
import {ThemeContext} from './AuthContext';
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme but also a toggleTheme
  // function from the context
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button onClick={toggleTheme}>
          <img alt="sun" src={sun}/>
          <img alt="moon" src={moon}/>
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;