// Contains the elements for the Audience, including:
  //  FeedbackBox.jsx
    // Slides.jsx
    // FeedbackButton.jsx

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';

class AudienceView extends Component {

  render () {
    return (
      <div>
      <LogoutButton/>
      <div>
        <Slides id="audienceSlides" class="slides" role="audience"/>
        <FeedbackBox/>
      </div>
      </div>
    );
  }
};

export default AudienceView;
