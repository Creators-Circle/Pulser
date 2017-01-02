// Contains the elements for the Audience, including:
  //  FeedbackBox.jsx
    // Slides.jsx
    // FeedbackButton.jsx

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import $ from 'jquery';

class AudienceView extends Component {

  joinPresentation () {
    // console.log('this event was triggered with ', $('#joinPresentation').val());
    let roomId = $('#joinPresentation').val();
    // fire off a socket event to add this user to the room for that presentation
    socket.emit('joinRoom', roomId);
  }

  render () {
    return (
      <div>
        <span>Join a Presentation:
          <input type="text" id="joinPresentation"></input>
          <button id="joinPresentationButton" onClick={this.joinPresentation}>JOIN!</button>
        </span>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox />
      </div>
    );
  }
};

export default AudienceView;
