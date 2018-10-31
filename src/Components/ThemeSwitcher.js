import React, {Component} from 'react';
import {db} from './Firebase';
import sun from '../assets/sun.svg'
import moon from '../assets/moon.svg'

// context api + firebase 即時切換

class ThemeSwitcher extends Component {

  setTheme = () => {

    if (this.props.props.theme === 'light') {
      db
        .collection("users")
        .doc(this.props.props.user.uid)
        .collection('theme')
        .doc('theme')
        .set({
          value: 'dark'
        }, {merge: true})

    } else {

      db
        .collection("users")
        .doc(this.props.props.user.uid)
        .collection('theme')
        .doc('theme')
        .set({
          value: 'light'
        }, {merge: true})

    }

  }
  render() {
    return <a href="#" onClick={() => this.setTheme()}>

      <span
        className={this.props.props.theme === 'dark'
        ? 'switch-to light icon'
        : 'switch-to dark icon'}>
        <img className="sun" alt="sun" src={sun}/>
        < img className="moon" alt="moon" src={moon}/>
      </span>

      {this.props.props.theme === 'dark'
        ? <span>小光</span>
        : <span>大光</span>}

    </a>
  }
}

export default ThemeSwitcher;
