import React from 'react';
import {db, dbe, auth} from './Firebase'

class Verse extends React.Component {
  constructor() {
    super();
    this.state = {
      linebreak: false,
      linebreakLong: false,
      zoom: false,
      status: null

    }

  }

  componentDidMount() {

    this.syncfirebase()
    // this.getfirebase()

  }

  syncfirebase = async() => {
    try {

      const uid = await auth.currentUser.uid
      const chapterId = this.props.chapterName
      const verseId = `${this.props.chapterNo}:${this.props.verseNo}`

      db
        .collection("users")
        .doc(uid)
        .collection(chapterId)
        .doc(verseId)
        .onSnapshot((querySnapshot) => {
          // var source = querySnapshot.metadata.fromCache   ? "local cache"   : "server";
          // console.log("Data came from " + source);

          if (querySnapshot.exists) {
            this.setState({
              status: querySnapshot
                .data()
                .status
            })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount() {

    const uid = auth.currentUser.uid
    const chapterId = this.props.chapterName
    const verseId = `${this.props.chapterNo}:${this.props.verseNo}`

    const unsubscribe = db
      .collection("users")
      .doc(uid)
      .collection(chapterId)
      .doc(verseId)
      .onSnapshot(function () {})

    // unsubscribe();

  }

  renderLineBreak = async() => {
    try {
      this.setState({status: 'open'});
      this.addVerse()
    } catch (error) {
      console.log(error)
    }
  }

  addVerseLong = async() => {

    const chapterId = this.props.chapterName
    const verseId = `${this.props.chapterNo}:${this.props.verseNo}`

    db
      .collection("users")
      .doc(this.props.uid)
      .collection(chapterId)
      .doc(verseId)
      .set({
        status: 'openLong'
      }, {merge: true})
      .then()
  }

  removeVerse = async() => {

    const chapterId = this.props.chapterName
    const verseId = `${this.props.chapterNo}:${this.props.verseNo}`

    try {
      db
        .collection("users")
        .doc(this.props.uid)
        .collection(chapterId)
        .doc(verseId)
        .delete()
        .then()
    } catch (error) {}
  }

  togglePress() {

    // 只有第一句以外的點了才有反應
    if (this.props.verseNo.toString() !== 1) {

      const chapterId = this.props.chapterName
      const verseId = `${this.props.chapterNo}:${this.props.verseNo}`
      const verseIdLong = `${this.props.chapterNo}:${this.props.verseNo}:long`

      if (this.state.status === 'openLong' || this.state.status === 'open') {
        this.setState({status: null})
        this.removeVerse()

      }

      if (this.state.status === null) {
        this.setState({status: 'openLong'})
        this.addVerseLong()

      }
    }
  }

  // renderBreak = () => {   if (this.props.defaultOpenLong === true) {     return
  // <span className="longBreak"></span>   }   if (this.props.defaultOpen ===
  // true) {     return <span class="shortBreak"></span>   }   return null }

  handleBreakClass = () => {

    if (this.state.status === 'openLong') {

      return "breakSpace long"
    }
    if (this.state.status === 'open') {
      return "breakSpace short"
    }
    return "breakSpace"
  }

  render() {

    const jumpId = `${this.props.chapterNo}:${this.props.verseNo}`
    const verseNoOnly = `${this.props.verseNo}`

    if (this.props.readonly) {
      return (
        <span className="hideFirstLongOpen">
          {/* {this.props.defaultOpenLong
            ? <span className="break-mark"></span>
            : null} */}

          {/* {this.renderBreak()} */}
          {this
            .props
            .verseNo
            .toString() === '1'
            ? null
            : <span className={this.handleBreakClass()}></span>}

          <span id={jumpId} className="verseUnit selectable">

            <span className="verseNoOnly">{verseNoOnly}</span>

            {this.props.children}

          </span>

        </span>
      )

    } else {

      return (
        <span>

          {this.state.status === 'openLong' && this
            .props
            .verseNo
            .toString() !== '1'
            ? <a className="break-mark" onClick={() => this.renderLineBreak()}>¶</a>
            : null}

          {/* {this.renderBreak()} */}
          {this
            .props
            .verseNo
            .toString() === '1'
            ? null
            : <span className={this.handleBreakClass()}></span>}

          <span id={jumpId} className="verseUnit" onClick={() => this.togglePress()}>

            {this.props.children}

          </span>

        </span>
      )
    }

  }
}

// const Gimeabreak = ({status}) => {   return (     <span className={status   ?
// '<br/>'       : 'gimeabreak'}></span>   ) }

export default Verse;