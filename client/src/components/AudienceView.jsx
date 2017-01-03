// Contains the elements for the Audience, including:
  //  FeedbackBox.jsx
    // Slides.jsx
    // FeedbackButton.jsx

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import $ from 'jquery';
import io from 'socket.io-client';

class AudienceView extends Component {
  constructor () {
    super();
    this.state = {
      room: null
    };
  }

  joinPresentation () {
    // console.log("this.socket in AudienceView: ", this.socket);
    let roomId = $('#joinPresentation').val();
    this.setState({room: io(`/${roomId}`)});
  }

  render () {
    return (
      <div>
        <span>Join a Presentation:
          <input type="text" id="joinPresentation"></input>
          <button id="joinPresentationButton" onClick={this.joinPresentation.bind(this)}>JOIN!</button>
        </span>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox socket={this.state.room}/>
      </div>
    );
  }
};

export default AudienceView;
