import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
// sidebar menu for presenter to toggle modules and use additional functionality
class Sidebar extends Component {

  componentDidMount () {
    // when questionToggle is clicked, emit a questionToggle event to tell the AudienceView to toggleFade the QuestionBox
    let socket = this.props.activeLecture.socket;
    $('#questionToggle').on('click', function(){
      console.log('this click event was fired.');
      socket.emit('questionToggle');
    });
  }
  render () {
    // console.log('this.props in Sidebar: ', this.props)
    let embedUrl = this.props.activeLecture.embedUrl;
    return (
      <div>
        <button>X</button>
        <button><a href={embedUrl} target="_blank">Projector</a></button>
        <button id='timerToggle'>Timer</button>
        <button id='questionToggle'>Question</button>
        <button id='pulseToggle'>Pulse</button>
        <Link id="stopPresentation" to="/summary"><button>Summary</button></Link>
        <Link id="stopPresentation" to="/summary"><button>Stop Presentation</button></Link>
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {activeLecture: state.activeLecture}; // CHANGE THIS TO WHAT IS NEEDED TO RESET TOKEN/SESSION
};

export default connect(mapStatetoProps)(Sidebar);
