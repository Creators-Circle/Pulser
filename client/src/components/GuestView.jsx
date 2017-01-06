// Contains the elements for the GuestView, including:
  // Slides
  // FeedbackBox
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import JoinPresBox from './JoinPresBox';

class GuestView extends Component {

  render () {
    return (
      <div>
        <LogoutButton/>
        <JoinPresBox/>
      </div>
    );
  }
};

export default GuestView;
