import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Bible from './Data/zh_cuv.json';
import Authed from './Components/Authed';
import {AuthContext, ThemeContext} from './Components/AuthContext';
import Loadable from 'react-loadable';
import {Loader} from './Components/Loader'

/*****************
 * CODE SPITTING *
 *****************/

const Main = Loadable({
  loader: () => import ('./Main'),
  loading() {
    return <Loader/>
  }
});

const Home = Loadable({
  loader: () => import ('./Home'),
  loading() {
    return <Loader/>
  }
});

const Fireplace = Loadable({
  loader: () => import ('./Fireplace'),
  loading() {
    return <Loader/>
  }
});

const Book = Loadable({
  loader: () => import ('./Book'),
  loading() {
    return <Loader/>
  }
});

const Gogoread = Loadable({
  loader: () => import ('./Gogoread'),
  loading() {
    return <Loader/>
  }
});

/************
 * ROOT APP *
 ************/

class App extends Component {

  render() {

    return (
      <Router>
        <Authed>

          <Route exact path="/" component={Home}/>
          <Route exact path="/Journey" component={Main}/>
          <Route exact path="/Book" component={Main}/>
          <Route path="/Gogoread" component={Gogoread}/>
          <Route path="/Fireplace" component={Fireplace}/> {/* author mode */}

          {Bible.map((books, index) => {
            return (

              <Route
                exact
                key={index}
                path={`/Journey/${books.abbrev}`}
                render={(props) => (
                <AuthContext.Consumer key={index}>
                  {value =>< Book uid = {
                    value.uid
                  }
                  {
                    ...props
                  }
                  no = {
                    index
                  } />}
                </AuthContext.Consumer>
              )}/>

            )
          })}

          {/* read only mode */}

          {Bible.map((books, index) => {
            return (

              <Route
                exact
                key={index}
                path={`/${books.abbrev}`}
                render={(props) => <Book
                readonly={true}
                uid={'6D3dC8LUIcXsQiuewz0rY8tEnFh2'}
                {...props}
                no={index}/>}/>

            )
          })}
        </Authed>
      </Router>
    );
  }
}

export default App;
