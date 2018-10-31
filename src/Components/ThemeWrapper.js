import React, {Component} from 'react';
import {AuthContext, ThemeContext} from './AuthContext';

class ThemeWrapper extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => <div id={value.theme} className="theme-wrapper">
          {this.props.children}
        </div>
}
      </ThemeContext.Consumer>
    );
  }
}

export default ThemeWrapper;
