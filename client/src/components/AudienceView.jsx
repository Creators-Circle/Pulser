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
import { browserHistory } from 'react-router';
import AudThumbs from './AudThumbs';

class AudienceView extends Component {

  componentDidMount () {
    let thumbs = this.props.thumbs;
    let dispatch = this.props.dispatch;
    // Socket event listener to trigger fade out
    let socket = this.props.activeLecture.socket;

    // Trigger questions box toggle
    socket.on('questionToggle', function () {
      $('#QuestionBox').fadeToggle('slow');
    });

    // open up 'thumbs' box
    socket.on('open thumbs', function (topicId, topic) {
      $('#thumbTopic').text(topic);
      $('#Thumbs').fadeToggle('slow');
      console.log('before toggle on', thumbs.displayed);
      dispatch({type: 'SET_TOPIC_ID', topicId: topicId});
      dispatch({type: 'TOGGLE_DISPLAY'});
      console.log('after toggle on', thumbs.displayed);
    });
    // Trugger thumbs box to close if still open
      // CURRENTLY NOT WORKING
    socket.on('close thumbs', function () {
      console.log('should close, but currently isn\'t');
      if (thumbs.displayed) {
        $('#Thumbs').fadeToggle('slow');
        dispatch({type: 'TOGGLE_THUMBS_BOX'});
      }
    });

    socket.on('stopPresentation', function () {
      browserHistory.push('/');
    });
  }

  render () {
    return (
      <div id="AudienceView">
      <LogoutButton/>
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
        <QuestionBox/>
        <AudThumbs/>
      </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    thumbs: state.thumbs,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(AudienceView);
