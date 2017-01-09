// Contains the elements for the Presenter, including:
  // TitleBar
    //  Is passed date from PresenterView props, lectureId from props, and
  // Slides
  // Timer
  // Menu of yet to be built modules
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
import LogoutButton from './LogoutButton';
import TitleBar from './TitleBar';
import QuestionBox from './QuestionBox';
import PresThumbs from './PresThumbs';

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
    let presentationName = this.props.activeLecture.name;
    let presentationId = this.props.activeLecture.presentationId;
    // Listen for audience request for presentation URL
    socket.on('presentationInfoRequest', function () {
      // response with presentation URL
      socket.emit('presentationInfoResponse', presentationUrl, presentationName, presentationId);
    });

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
      <div>
        <LogoutButton/>
        <div className='presenter-view'>
          <TitleBar className='title-bar'/>
          <Slides id="presenterSlides" role="presenter"/>
          <Sidebar />
          <Timer/>
          <PulseBox startTime={this.date} audience={this.state.audience}/>
          <QuestionBox/>
          <PresThumbs/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(PresenterView);
