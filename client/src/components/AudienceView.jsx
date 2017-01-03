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
  	}
  }

  render () {
    return (
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
      </div>
    );
  }
};

export default AudienceView;
