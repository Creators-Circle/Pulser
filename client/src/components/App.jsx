//  App structure
  //  ---||-------App--------||-----
  // PresenterView      AudienceView
  //     ||                  ||
  //  PulseBox          FeedbackBox
  //                         ||
  //                   FeedbackButton

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slides from './Slides';
// Allows html-like link functionality.
import { Link } from 'react-router';

import getUserData from '../util/getUserData';

// import FeedbackBox from './FeedbackBox'
// import PulseBox from './PulseBox'

// Links route users to pulsebox and feedbackbox as appropriate.
class App extends Component {

  componentWillMount () {
    // store user data when the application loads
    getUserData((user) => {
      this.props.dispatch({
        type: 'STORE_USER',
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    });
  };
  render () {
    console.log('app props', this.props);
    return (
      <div>
        <p>Hello {this.props.user.name}!</p>
        <img src={this.props.user.avatar} />
        <li><Link to="/presenter">Presenter</Link></li>
        <li><Link to="/audience">Audience</Link></li>
      </div>
    );
  };
};

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific state you want to import
const mapStatetoProps = (state) => {
  return {
    pulseData: state.pulseData,
    user: state.user
  };
};

export default connect(mapStatetoProps)(App);
