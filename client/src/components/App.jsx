import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slides from './Slides';
//Allows html-like link functionality.
import { Link } from 'react-router'

// import FeedbackBox from './FeedbackBox'
// import PulseBox from './PulseBox'

//Links route users to pulsebox and feedbackbox as appropriate.
class App extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <p>Hello World!</p>
        <li><Link to="/pulsebox">Presenter</Link></li>
        <li><Link to="/feedbackbox">Audience</Link></li>
      </div>
    )
  }
}

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific state you want to import
const mapStatetoProps = (state) => {
  // return pulseData coming from redux store
  return {pulseData: state.pulseData}
}


export default connect(mapStatetoProps)(App)
