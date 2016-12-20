import React, { Component } from 'react';

// Component to display embedded Goolge Slides presentation
export class Slides extends Component {

  render () {
    let slidesId = '1pjT5Dgb9DVmxEPe3KvAcjUIRLhsPY458PWPwZ6uce40';
    // return <iframe> with embedded google slides presentation
    // current default presentation is "Effective Pairing and Feedback"
    return (
      <iframe
      height="100%"
      width="100%"
      allowfullscreen="true"
      type="iframe"
      title={ undefined /* <-- Will need to be replaced with variable */ || '[Slides] Effective Pairing and Feedback' }
      src={ `https://docs.google.com/a/hackreactor.com/presentation/d/${slidesId}/embed?start=false&amp;loop=false&amp;delayms=3000` }
      >
      </iframe>
    );
  }

  ComponentDidMount () {
    // Add in event listeners for slides navigation clicks / key presses
    document.getElementsByClassName('div.punch-viewer-left')
      .addEventListener('click', function () {
          // socket.emit('navigate', "L");
      });
    document.getElementsByClassName('div.punch-viewer-right')
      .addEventListener('click', function () {
          // socket.emit('navigate', "R");
      });
  }
}
