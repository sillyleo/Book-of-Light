import React, {Component} from 'react';
import Bible from './Data/zh_cuv.json';
import {AppTop, AppBase} from './Components/Layout';
import {BackButton} from './Components/BackButton';
import {HashLink as Link} from 'react-router-hash-link';
import {Loader} from './Components/Loader.js';
import img from './assets/Back.svg'

class Main extends Component {

  render() {
    return (
      <AppBase>
        <AppTop>
          <a className="back-button" onClick={() => this.props.history.push('/')}>
            <img alt="back" src={img}/>
          </a>
          {this.props.location.pathname === '/Book'
            ? <h4 id="page-title">選擇書卷</h4>
            : <h4 id="page-title">我的旅程</h4>}

        </AppTop>
        <ul className="homelist">

          {Bible.map((books, index) => {

            return (

              <li
                key={index}
                className={index === 4 || index === 16 || index === 21 || index === 38 || index === 26 || index === 42 || index === 43 || index === 52 || index === 56 || index === 64
                ? `extra-margin ${books.abbrev}`
                : `${books.abbrev}`}>
                {this.props.location.pathname === '/Book'
                  ? <VerseJumper {...books}/>
                  : <Link to={`/Journey/${books.abbrev}`}>
                    {/* <img alt='icon' className="icon" src={require('./assets/read.png')}/> */}

                    <span>
                      {books.name_zh}</span>
                  </Link>}
              </li>

            )
          })}
        </ul>
      </AppBase>

    );
  }
}

class VerseJumper extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    }
  }

  toggleSelector = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

    if (this.props.chapters.length > 1) {
      return (
        <span className="verseJumper">
          <Link className="smallbox" to={`/${this.props.abbrev}`}>
            {/* <img alt='icon' className="icon" src={require('./assets/read.png')}/> */}
            <span>{this.props.name_zh}</span>
          </Link>
          <span className="verseToggle" onClick={() => this.toggleSelector()}>{this.props.chapters.length}</span>
          <span
            className={this.state.isOpen
            ? 'verseSelector active'
            : 'verseSelector'}>

            {this
              .props
              .chapters
              .map((book, index) => {
                const chapterNo = index + 1
                return (
                  <Link key={index} to={`/${this.props.abbrev}#${chapterNo}`}>{chapterNo}</Link>
                )
              })}
          </span>
        </span>

      )
    } else 
      return (

        <span className="verseJumper">
          <Link className="smallbox" to={`/${this.props.abbrev}`}>
            {/* <img alt='icon' className="icon" src={require('./assets/read.png')}/> */}
            <span>{this.props.name_zh}</span>
          </Link>

        </span>

      )
  }
}

export default Main;
