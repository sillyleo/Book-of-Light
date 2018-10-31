import React from 'react';
import {AuthContext, ThemeContext} from './AuthContext';

export class AppBase extends React.Component {

  render() {
    return (
      <div className="AppBase">
        {this.props.children}
      </div>
    );
  }
}

export const AppTop = (props) => {
  return (
    <div className="AppTop">
      {props.children}
    </div>
  )
}
export const AppBottom = (props) => {
  return (
    <div className="AppBottom">
      <p>{props.children}</p>
    </div>
  )
}