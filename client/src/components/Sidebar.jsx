import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// sidebar menu for presenter to toggle modules and use additional functionality
class Sidebar extends Component {

  render () {
    // console.log('this.props in Sidebar: ', this.props)
    let embedUrl = this.props.activeLecture.embedUrl;
    return (
      <div>
        <button>X</button>
        <button><a href={embedUrl} target="_blank">Projector</a></button>
        <button>Timer</button>
        <button>Question</button>
        <button>Pulse</button>
        <button>Summary</button>
        <Link id="stopPresentation" to="/summary"><button>Stop Presentation</button></Link>
      </div>
    );
  }
};

const mapStatetoProps = (state) => {
  return {activeLecture: state.activeLecture}; // CHANGE THIS TO WHAT IS NEEDED TO RESET TOKEN/SESSION
};

export default connect(mapStatetoProps)(Sidebar);
