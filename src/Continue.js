import React, {Component} from 'react';
import {db} from './Components/Firebase';
import {HashLink} from 'react-router-hash-link';

class Continue extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      continueURL: ''
    }
  }

  componentDidMount() {

    this.setState({
      user: this.props.uid
    }, () => this.getProgress());

  }
  getProgress = () => {

    db
      .collection("users")
      .doc(this.state.user.uid)
      .collection('progress')
      .doc('progress')
      .onSnapshot((querySnapshot) => {

        if (querySnapshot.data()) {

          const a = querySnapshot
            .data()
            .value

          const b = querySnapshot
            .data()
            .chapterValue;
          const c = b + 1

          this.setState({
            continueURL: "/Journey/" + a + "#" + c
          })
        }

      })

  }
  render() {
    return (this.state.continueURL
      ? <HashLink className="continue-button" to={this.state.continueURL}>Continue</HashLink>
      : null);
  }
}

export default Continue;

// 在要用的地方放這個
{/* <AuthContext.Consumer>
{value => {
  if (value) {
    return <Continue uid={value}/>
  }
  return null
}}
</AuthContext.Consumer> */
}