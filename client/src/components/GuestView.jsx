// Contains the elements for the GuestView, including:
  // FeedbackBox
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import JoinPresBox from './JoinPresBox';

class GuestView extends Component {

  render () {
    return (
      <div>
        <JoinPresBox/>
        <LogoutButton/>
      </div>
    );
  }
};

export default GuestView;
