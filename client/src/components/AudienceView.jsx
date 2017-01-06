// Contains the elements for the Audience, including:
  // Logout Button
  // FeedbackBox
  // Slides
  // FeedbackButton

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import QuestionBox from './QuestionBox'; // also renders to presenter view
import { connect } from 'react-redux';

class AudienceView extends Component {

  componentDidMount () {
    // Socket event listener to trigger fade out
    let socket = this.props.activeLecture.socket;
    socket.on('questionToggle', function () {
      $('#QuestionBox').fadeToggle('slow');
    });
  }

  render () {
    return (
      <div>
      <LogoutButton/>
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
        <QuestionBox/>
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

export default connect(mapStateToProps)(AudienceView);
