import React from 'react';
import {Link} from "react-router-dom";
import {AuthContext, ThemeContext} from './Components/AuthContext';
import {AppTop, AppBase} from './Components/Layout';
import ThemeTogglerButton from './Components/ThemeToggler';
import ThemeSwitcher from './Components/ThemeSwitcher';

class Home extends React.Component {

  render() {

    return (
      <AppBase>
        <AppTop>
          <h4 id="page-title">光之書</h4>
        </AppTop>
        <ul className="homelist">
          <li>
            <AuthContext.Consumer>
              {value => {

                const imgurl = value.photoURL
                const name = value.displayName
                return (
                  <Link className="col" to="/Profile">
                    <img alt='icon' className="avatar" src={imgurl}/>
                    <div>
                      <p className="subtitle1 name">{name}</p>
                      <p className="caption">進度、徽章與同伴</p>
                    </div>
                  </Link>
                )

              }}
            </AuthContext.Consumer>
          </li>
          <li className="seperator"></li>

          <li>
            <Link to="/Journey">
              <img alt='icon' className="icon" src={require('./assets/read.png')}/>
              <span>與神同行</span>
            </Link>
          </li>
          <li>
            <Link to="/Fireplace">
              <img alt='icon' className="icon" src={require('./assets/fire.png')}/>
              <span>營火邊</span>
            </Link>
          </li>
          <li className="seperator"></li>

          <li>
            <Link to="/Book">
              <img alt='icon' className="icon" src={require('./assets/wing.png')}/>
              <span>時間旅行</span>
            </Link>
          </li>
          <li>
            <Link to="/Guide">
              <img alt='icon' className="icon" src={require('./assets/help.png')}/>
              <span>導引</span>
            </Link>
          </li>
          <li className="seperator"></li>

          <li>
            <Link to="/Guide">
              <img alt='icon' className="icon" src={require('./assets/dev.png')}/>
              <span>邀請</span>
            </Link>
          </li>
          <li className="seperator"></li>
          <li>
            <ThemeContext.Consumer>
              {value => {
                if (value) {
                  return <ThemeSwitcher props={value}/>
                }
                return null
              }}
            </ThemeContext.Consumer>
          </li>

        </ul>
      </AppBase>
    )

  }
}

export default Home;