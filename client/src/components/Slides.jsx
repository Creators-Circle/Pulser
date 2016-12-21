import React, { Component } from 'react';
import $ from 'jquery';

// Component to display embedded Goolge Slides presentation
class Slides extends Component {
  constructor (props) {
    super();
  }

  render () {
    let slidesId = '1pjT5Dgb9DVmxEPe3KvAcjUIRLhsPY458PWPwZ6uce40';
    // return <iframe> with embedded google slides presentation
    // current default presentation is "Effective Pairing and Feedback"
    return (
      <iframe
      className="slides"
      id={this.props.id}
      allowFullScreen="true"
      type="iframe"
      title={ undefined /* <-- Will need to be replaced with variable */ || '[Slides] Effective Pairing and Feedback' }
      src={ `https://docs.google.com/a/hackreactor.com/presentation/d/${slidesId}/embed?start=false&amp;loop=false&amp;delayms=3000` }
      >
      </iframe>
    );
  }

  componentDidMount () {
    // TODO: Add in event listeners for slides navigation clicks / key presses

    // Add styles to size iframe
    // Should move this to style.css later if possible
    $('#audienceSlides').css({
      'height': '90vh',
      'width': '100%'
    });
    $('#presenterSlides').css({
      'height': '70vh',
      'width': '100%'
    });
  }
}

export default Slides;
