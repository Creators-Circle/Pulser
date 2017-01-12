import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import TitleBar from './TitleBar';
import '../css/Sidebar.css';

// sidebar menu for presenter to toggle modules and use additional functionality
class Sidebar extends Component {

  componentDidMount () {
    // Capture the this context
    let socket = this.props.activeLecture.socket;
    let lectureId = this.props.activeLecture.lectureId;
    let thumbsToggle = false; // not sure if this is gonna work???
    let dispatch = this.props.dispatch;
    let guestsPermitted = false;

    // When ComponentToggle is clicked:
      // ToggleFade the Component out of the PresenterView
      // And/or emit a ComponentToggle event to tell the AudienceView to toggleFade the Component

    $('#questionToggle').on('click', function () {
      socket.emit('questionToggle');
      console.log('questionToggle was clicked');
      // update the store as well
      dispatch({
        type: 'TOGGLE_ENABLED'
      });
    });

    // Toggle in/out 'Thumbs' component
    $('#thumbsToggle').on('click', function () {
      // update the store as well
      dispatch({
        type: 'TOGGLE_DISPLAY_THUMBS'
      });
    // If thumbs component isn't toggled, then toggle it in
      if (!thumbsToggle) {
        console.log('!thumbsToggle');
        $('#PresThumbs').fadeToggle('slow');
      } else { // if already visible, toggle it out and reset it
        console.log('thumbsToggle');
        $('#PresThumbs').fadeToggle('fast');
        $('#topicTitle').text('Topic: ');
        $('#topic').val('');
        $('#topic, #setTopic').fadeIn();
        socket.emit('close thumbs'); // emit event to close all audience thumbs components
        dispatch({type: 'CLEAR_TOPIC'}); // dispatch action to clear store of thumb data
      }
      thumbsToggle = !thumbsToggle; // toggle boolean value of thumbsToggle
    });

    $('#timerToggle').on('click', function () {
      $('.timer').fadeToggle('slow');
    });

    $('#pulseToggle').on('click', function () {
      $('#PulseBox').fadeToggle('slow');
    });

    $('#feedbackToggle').on('click', function () {
      dispatch({type: 'TOGGLE_DISPLAY_FEEDBACK'});
      socket.emit('feedbackToggle');
    });

    $('#guestsToggle').on('click', function () {
      let lecture = {
        lectureId: lectureId,
        guestsPermitted: !guestsPermitted
      };
      socket.emit('guestsToggle', lecture);
      guestsPermitted = true;
    });

    // Events that end the presentation should alert the audience and server
    $('#stopPresentation, #exit').on('click', () => {
      this.props.stopTimer();
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
      <div id="Sidebar">
        <ul id="SidebarElements">
          <li><TitleBar className='title-bar'/></li>
          <div className='timer' style={{display: 'none'}}>
            <div className='clock'>Time: {this.props.time}</div>
            <div>Duration: {this.props.duration}</div>
          </div>
          <li><Link to={`/summary/${this.props.activeLecture.lectureId}`}><button id='exit'>X</button></Link></li>
          <li><a href={embedUrl} target="_blank"><button>Projector</button></a></li>
          <li><button id='timerToggle'>Timer</button></li>
          <li><button id='questionToggle'>Question</button></li>
          <li><button id='thumbsToggle'>Thumbs</button></li>
          <li><button id='pulseToggle'>Pulse</button></li>
          <li><button id='feedbackToggle'>Feedback</button></li>
          <li><span>Permit Guests<input type="checkbox" id='guestsToggle'></input></span></li>
          <li><Link to={`/summary/${this.props.activeLecture.lectureId}`}><button id='stopPresentation'>Stop Presentation</button></Link></li>
        </ul>
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    dispatch: state.dispatch
  };
};

export default connect(mapStatetoProps)(Sidebar);
