import React from 'react';
import Verse from './Verse';
import {AuthContext} from './AuthContext';
import {db} from './Firebase';
import LazyLoad from 'react-lazyload';
import {LoaderText} from './Loader'
import fireplace from '../assets/fireplace.svg'

class Chapter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      progress: '',
      isOpen: false
    }
    this.chapterHead = React.createRef();
    this.unsubscribe = null;
    this.myRef = React.createRef();

  }

  startFire = () => {
    db
      .collection("users")
      .doc(this.props.uid)
      .collection('progress')
      .doc('progress')
      .set({
        value: this.props.chapterName,
        chapterValue: this.props.id
      }, {merge: true})
      .then(() => this.props.history.push('/Fireplace'))
  }
  componentWillMount() {
    // window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    // var name = ReactDOM.findDOMNode(this.xxx); console.log(this.xxx);
    // console.log(name) 找到 chapter np. 紀錄後就可以紀錄進度
  }
  componentDidMount() {}

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll); const realtime = {
    // isTrue: false } if (this.props.uid && realtime.isTrue) { this.unsubscribe();
    // }
  }

  render() {

    return (
      <span id={this.props.id}>

        {this.props.readonly
          ? <h6 className="chapterNoOnly">{this.props.chapterNo}</h6>
          : null}

        {this
          .props
          .data
          .map((verse, index) => {

            const currentVerse = `${this.props.chapterNo}:${index + 1}`
            const currentVerseLong = `${this.props.chapterNo}:${index + 1}:long`

            const foundVerses = this.props.defaultOpenVerses
              ? this
                .props
                .defaultOpenVerses
                .some(function (name) {
                  return name === currentVerse;
                })
              : false;

            const foundVersesLong = this.props.defaultOpenVersesLong
              ? this
                .props
                .defaultOpenVersesLong
                .some(function (name) {
                  return name === currentVerseLong;
                })
              : false;

            // console.log("current:", currentVerse);

            return (

              <AuthContext.Consumer key={index}>

                {value => {

                  return (

                    <Verse
                      defaultOpen={foundVerses}
                      defaultOpenLong={foundVersesLong}
                      uid={value.uid}
                      readonly={this.props.readonly}
                      chapterName={this.props.chapterName}
                      chapterNo={this.props.chapterNo}
                      key={index}
                      verseNo={index + 1}>{verse}</Verse>
                  )

                }
}

              </AuthContext.Consumer>

            )
          })
}

        {this.props.readonly
          ? null
          : <span onClick={() => this.startFire()} className="fireplace"><img alt="fireplace" src={fireplace}/></span>}

      </span>

    )

  }
}

export default Chapter;