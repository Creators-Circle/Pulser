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

class PresenterView extends Component {

  render () {
    return (

      <div className = 'presenter-view'>
        <Slides id="presenterSlides" role="presenter"/>
        <iframe src="http://ipadstopwatch.com/embed.html" frameBorder="0" scrolling="no" width="391" height="140"></iframe>
        <PulseBox startTime={new Date()} />
      </div>
    );
  }
};

export default PresenterView;
