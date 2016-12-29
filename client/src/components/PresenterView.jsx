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
import { Link } from 'react-router';
import $ from 'jquery';
import '../css/Presentation.css';
import SummaryView from './SummaryView';

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
    $('#stopPresentation').on('click', function () {
      // emit an !audienceOnly event to the server to reset audienceOnly
      socket.emit('!audienceOnly');
    });
  }

  render () {
    return (
      <div className = 'presenter-view'>
        <Link id="stopPresentation" to="/summary">Stop Presentation</Link>
        <Slides id="presenterSlides" role="presenter"/>
        <iframe src="http://ipadstopwatch.com/embed.html" frameBorder="0" scrolling="no" width="391" height="70"></iframe>
        <PulseBox startTime={this.date} audience={this.state.audience}/>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);