import React, {Component} from 'react';
import {AppTop, AppBase} from './Components/Layout';
import Continue from './Continue';
import {AuthContext} from './Components/AuthContext';
import {Link} from "react-router-dom";
import img from './assets/Back.svg'

class Fireplace extends Component {
  render() {
    return (
      <AppBase>
        <AppTop>

          <Link className="back-button" to="/">
            <img alt="back" src={img}/>
          </Link>
          <h4 id="page-title">營火邊</h4>
        </AppTop>
        <p>
          <AuthContext.Consumer>
            {value => {
              if (value) {
                return <Continue uid={value}/>
              }
              return <p>Nothing to continue</p>
            }}
          </AuthContext.Consumer>
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
          repudiandae, iste aspernatur nulla laborum architecto sequi veniam distinctio
          nostrum, blanditiis odit assumenda, dolorem odio perferendis nisi quam numquam
          eaque. Sed.</p>

      </AppBase>
    );
  }
}

export default Fireplace;
