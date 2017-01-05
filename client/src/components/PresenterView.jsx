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
    this.state = {
      audience: 0
    };
  }

  componentDidMount () {
    let presentationUrl = this.props.activeLecture.embedUrl;
    let socket = this.props.activeLecture.socket;
    console.log('props in presenter-view:', this.props.activeLecture); // REMOVE WHEN <TitleBar/> IS PRESENT

    // Listen for audience request for presentation URL
    socket.on('presentationUrlRequest', function () {
      // response with presentation URL
      socket.emit('presentationUrlResponse', presentationUrl);
    });

    // If an audience member has connected, update the state
    // this.socket.on('connected', () => {
    //   this.setState({audience: ++this.state.audience});
    // });
    socket.on('connected', () => {
      // Another User has connected
      // Need to increment the audience store
      this.setState({audience: ++this.state.audience});
    });

    // If an audience member has disconnected, update the state
    socket.on('disconnected', () => {
      // A user has left the lecture
      // Need to decrement the audience store (but not past 0)
      if (this.state.audience > 0) {
        this.setState({audience: --this.state.audience});
      }
    });
  }

  render () {
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
