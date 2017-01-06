// Contains the elements for the Audience, including:
  //  FeedbackBox.jsx
    // Slides.jsx
    // FeedbackButton.jsx

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import $ from 'jquery';
import QuestionBox from './QuestionBox'; // also renders to presenter view

class AudienceView extends Component {

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

export default AudienceView;
