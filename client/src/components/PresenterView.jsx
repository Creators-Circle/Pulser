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
    console.log('Lecture ID:', this.props.activeLecture.lectureId);
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
