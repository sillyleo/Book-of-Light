import React from 'react'
import Bible from './Data/zh_cuv.json';
import Chapter from './Components/Chapter'
import {db} from './Components/Firebase';
import {AuthContext} from './Components/AuthContext';
// import ScrollManager from './Components/ScrollManager';
import {AppTop, AppBase} from './Components/Layout';
// import {BackButton} from './Components/BackButton';
import {Link} from "react-router-dom";
import img from './assets/Back.svg'
import mode1 from './assets/mode1.svg'
import mode2 from './assets/mode2.svg'

class Book extends React.Component {

  constructor() {
    super();
    this.state = {
      defaultOpenVerses: [],
      defaultOpenVersesLong: []
    }

  }

  componentDidMount() {
    // db   .disableNetwork()   .then(() => console.log('offline')); setTimeout(()
    // => {   db     .enableNetwork()     .then(() => console.log('online')) },
    // 2000); // 取得所有打開的 array const chapterName = Bible[this.props.no].abbrev db
    // .collection('users')   .doc(this.props.uid)   .collection(chapterName)
    // .doc(chapterName)   .onSnapshot((querySnapshot) => {     if
    // (querySnapshot.exists) {       const data = querySnapshot         .data()
    // .defaultOpen       // console.log(querySnapshot.data())
    // this.setState({defaultOpenVerses: data})     } else {
    // this.setState({defaultOpenVerses: []})     }   }, (error) => {}); db
    // .collection('users')   .doc(this.props.uid)   .collection(chapterName)
    // .doc(chapterName)   .onSnapshot((querySnapshot) => {     if
    // (querySnapshot.exists) {       const data = querySnapshot         .data()
    // .defaultOpenLong       this.setState({defaultOpenVersesLong: data})     }
    // else {       this.setState({defaultOpenVersesLong: []})     }   }, (error) =>
    // {});

  }

  render() {

    return (
      <AppBase>

        <div className={`book-cover ${Bible[this.props.no].abbrev}`}></div>
        <AppTop>
          {this.props.readonly
            ? <Link
                to={`/Journey/${Bible[this.props.no].abbrev}`}
                className="switch-mode-button"><img alt="mode1" src={mode1}/></Link>
            : <Link to={`/${Bible[this.props.no].abbrev}`} className="switch-mode-button"><img alt="mode2" src={mode2}/></Link>}

          {this.props.readonly
            ? <Link className="back-button" to="/Book">
                <img alt="back" src={img}/>
              </Link>
            : <Link className="back-button" to="/Journey">
              <img alt="back" src={img}/>
            </Link>}

          {this.props.readonly
            ? <h5 className="book-title readonly">{Bible[this.props.no].name_zh}</h5>
            : <h5 className="book-title">{Bible[this.props.no].name_zh}</h5>}

        </AppTop>
        {/* <ScrollManager scrollKey={this.props.match.path}/> */}

        <div className="article-view">

          <div className="verse-view">

            {Bible[this.props.no]
              .chapters
              .map((chapter, index) => {
                const chapterId = index + 1

                return (

                  <AuthContext.Consumer key={index}>
                    {value => {
                      return ((<Chapter
                        {...this.props}
                        defaultOpenVerses={this.state.defaultOpenVerses}
                        defaultOpenVersesLong={this.state.defaultOpenVersesLong}
                        uid={value.uid}
                        id={chapterId}
                        chapterName={Bible[this.props.no].abbrev}
                        chapterNo={index + 1}
                        data={chapter}/>))
                    }}
                  </AuthContext.Consumer>

                )
              })}
          </div>
        </div>
      </AppBase>
    );
  }
}

export default Book;
