// Contains the elements for the GuestView, including:
  // FeedbackBox
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import JoinPresBox from './JoinPresBox';
import Navbar from './Navbar';
import '../css/GuestView.css';

class GuestView extends Component {

  render () {
    return (
      <div id="GuestViewBody">
        <Navbar/>
        <div id="GuestJoin">
          <div id="GuestTitle">Welcome, Stranger</div>
          <div id="GuestSubtitle">Enter your 6 digit acess code to get started</div>
          <div id="JoinPresBoxGuest">
            <JoinPresBox role="guest"/>
          </div>
        </div>
      </div>
    );
  }
};

export default GuestView;
