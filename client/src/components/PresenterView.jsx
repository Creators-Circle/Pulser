// Contains the elements for the Presenter, including:
  // Slides
  // Timer
  // PulseBox Component
    // PulseBox is passed a startTime to represent the time at which the presentation is started,
    // which is assumed to be the time that the PresenterView renders

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PulseBox from './PulseBox';
import Slides from './Slides';
import $ from 'jquery';
import '../css/Presentation.css';
import SummaryView from './SummaryView';
import Timer from './Timer';
import Sidebar from './Sidebar';

class PresenterView extends Component {
  constructor () {
    super();
    this.date = new Date();
    this.state = {audience: 0};
    // Generate a random, 6 character string to name the socket 'room' for that presentation
    this.room = (Math.random().toString(36) + '00000000000000000').slice(2, 8);
    // Join the presenter to that room
    // this.socket = io(`/${this.room}`);
    let room = this.room;
    $.ajax({
      type: 'POST',
      url: '/newRoom',
      data: JSON.stringify({room: room}),
      contentType: 'application/json'
    });
  }

  componentDidMount () {
    // If an audience member has connected, update the state
    // this.socket.on('connected', () => {
    //   this.setState({audience: ++this.state.audience});
    // });
    // If an audience member has disconnected, update the state
    // this.socket.on('disconnected', () => {
    //   // Don't decrement the audience count past 0
    //   if (this.state.audience > 0) {
    //     this.setState({audience: --this.state.audience});
    //   }
    // });
  }

  render () {
    // inserted temporary button to test Google Picker functionality
    return (
      <div className = 'presenter-view'>
        <Slides id="presenterSlides" role="presenter"/>
        <Sidebar />
        <Timer/>
        <PulseBox startTime={this.date} audience={this.state.audience}/>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
