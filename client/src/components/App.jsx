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

// Links route users to pulsebox and feedbackbox as appropriate.
class App extends Component {

  componentWillMount () {
    // store user data when App loads. 
    // Note that by this point the user will have logged in. 
    // Their user information comes from the auth
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
    // console.log('props in App render', this.props);
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
// mapStatetoProps lets you specify specific parts of the state that you want to import
const mapStatetoProps = (state) => {
  return {
    pulseData: state.pulseData,
    user: state.user
  };
};

export default connect(mapStatetoProps)(App);
