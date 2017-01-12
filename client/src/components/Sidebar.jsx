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
        <ul>
          <li><TitleBar className='title-bar'/></li>
          <div className='timer'>
            <div className='clock'>{this.props.time}</div>
            <div className='sidebar-header'>
              <h2>DURATION</h2>
              <p>{this.props.duration}</p>
            </div>
            <hr/>
          </div>
        </ul>
        <div className='container'/>

          <div className='row tools-row allow-guest'>
            <span>Permit Guests<input type="checkbox" id='guestsToggle'></input></span>
          </div>
          <hr/>

          <div className='row tools-row '>
            <div className='offset-md-1'>
              <a href={embedUrl} target="_blank"><button className='btn tool-btn btn'><span>Projector</span><i className="fa fa-desktop"></i></button></a>
              <button id='timerToggle' className='tool-btn btn'><span>Timer</span><i className="fa fa-clock-o"></i></button>
            </div>
          </div>

          <div className='row tools-row '>
            <button id='questionToggle' className='tool-btn btn'><span>Question</span><i className="fa fa-question-circle-o"></i></button>
            <button id='thumbsToggle' className='tool-btn btn'><span>Thumbs</span><i className="fa fa-thumbs-up"></i></button>
          </div>

          <div className='row tools-row '>
            <button id='pulseToggle' className='tool-btn btn'><span>Pulse</span><i className="fa fa-line-chart"></i></button>
            <button id='feedbackToggle' className='tool-btn btn'><span>Feedback</span><i className="fa fa-exclamation"></i></button>
          </div>

          <div className='row tools-row '>
            <Link to={`/summary/${this.props.activeLecture.lectureId}`}>
              <button id='stopPresentation' className='btn btn-red' >Stop Presentation
                <i className="fa fa-times"></i>
              </button>
            </Link>
          </div>

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
