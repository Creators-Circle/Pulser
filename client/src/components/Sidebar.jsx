import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
// sidebar menu for presenter to toggle modules and use additional functionality
class Sidebar extends Component {

  componentDidMount () {
    // Capture the this context
    let socket = this.props.activeLecture.socket;
    let lectureId = this.props.activeLecture.lectureId;
    // When ComponentToggle is clicked:
      // ToggleFade the Component out of the PresenterView
      // And/or emit a ComponentToggle event to tell the AudienceView to toggleFade the Component

    $('#questionToggle').on('click', function () {
      socket.emit('questionToggle');
      $('#QuestionBox').fadeToggle('slow');
    });

    $('#timerToggle').on('click', function () {
      $('#Timer').fadeToggle('slow');
    });

    $('#pulseToggle').on('click', function () {
      $('#PulseBox').fadeToggle('slow');
    });

    // Events that end the presentation should alert the audience and server
    $('#stopPresentation', '#summary').on('click', function () {
      let endTime = new Date();
      let endLecture = {
        id: lectureId,
        endTime: endTime
      };
      socket.emit('stopPresentation', endLecture);
    });
  }

  render () {
    // console.log('this.props in Sidebar: ', this.props)
    let embedUrl = this.props.activeLecture.embedUrl;
    return (
      <div>
        <button>X</button>
        <a href={embedUrl} target="_blank"><button>Projector</button></a>
        <button id='timerToggle'>Timer</button>
        <button id='questionToggle'>Question</button>
        <button id='pulseToggle'>Pulse</button>
        <Link id='summary' to='/summary'><button>Summary</button></Link>
        <Link id='stopPresentation' to='/summary'><button>Stop Presentation</button></Link>
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {activeLecture: state.activeLecture}; // CHANGE THIS TO WHAT IS NEEDED TO RESET TOKEN/SESSION
};

export default connect(mapStatetoProps)(Sidebar);
