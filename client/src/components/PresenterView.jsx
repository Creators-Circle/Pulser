// Contains the elements for the Presenter, including:
  // Slides
  // Stopwatch iframe
  // PulseBox Component
    // PulseBox is passed a startTime to represent the time at which the presentation is started,
    // which is assumed to be the time that the PresenterView renders

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PulseBox from './PulseBox';
import Slides from './Slides';

import '../css/Presentation.css';

class PresenterView extends Component {
  constructor () {
    super();
    this.date = new Date();
    this.state = {audience: 0};
  }

  componentDidMount () {
    // If an audience member has connected, update the state
    socket.on('connected', () => {
      this.setState({audience: ++this.state.audience});
    });
    socket.on('disconnected', () => {
      // If an audience member has disconnected, update the state
      if (this.state.audience > 0) {
        this.setState({audience: --this.state.audience});
      }
    });
  }

  render () {
    console.log(this.state.audience);
    return (
      <div className = 'presenter-view'>
        <Slides id="presenterSlides" role="presenter"/>
        <iframe src="http://ipadstopwatch.com/embed.html" frameBorder="0" scrolling="no" width="391" height="140"></iframe>
        <PulseBox startTime={this.date} audience={this.state.audience}/>
      </div>
    );
  }
};

export default PresenterView;
