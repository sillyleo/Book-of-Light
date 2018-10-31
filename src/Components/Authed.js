import React, {Component} from 'react';
import {AuthContext, ThemeContext} from './AuthContext'
import {auth, provider} from './Firebase';
import {Loader} from './Loader'
import {db} from './Firebase';

import ThemeWrapper from './ThemeWrapper';

class Authed extends Component {
  constructor() {
    super();

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === 'light'
          ? 'dark'
          : 'light'
      }));
    };

    this.state = {
      user: null,
      loginRedirect: false,
      continueURL: '',
      loading: true,
      theme: 'light',
      toggleTheme: this.toggleTheme
    }

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user, loading: false});

        // get theme settings
        db
          .collection('users')
          .doc(user.uid)
          .collection('theme')
          .doc('theme')
          .onSnapshot((querySnapshot) => {
            if (querySnapshot.exists) {
              this.setState({
                theme: querySnapshot
                  .data()
                  .value
              });

            } else {
              this.setState({theme: "light"});

            }

          }, (error) => {});

      } else {
        this.setState({user: null, loading: false});
      }
    });
  }

  logout = () => {
    auth
      .signOut()
      .then(() => {
        this.setState({user: null})
      })
  }
  login = () => {
    auth
      .signInWithRedirect(provider)
      .then((result) => {
        const user = result.user;
        this.setState({user});
      });
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.user}>
        <ThemeContext.Provider value={this.state}>

          <AuthContext.Consumer>
            {value => {
              if (value) {
                return <ThemeWrapper>
                  {this.props.children}
                  <div className="logout-block">
                    <button onClick={this.logout}>Log Out</button>
                  </div>
                </ThemeWrapper>
              }

              if (this.state.loading) {
                return <Loader/>
              } else {
                return <ThemeWrapper>
                  <h4>Log in</h4>
                  <button onClick={this.login}>Log In</button>
                </ThemeWrapper>
              }
            }}
          </AuthContext.Consumer>

        </ThemeContext.Provider>
      </AuthContext.Provider>
    );
  }
}

export default Authed;
