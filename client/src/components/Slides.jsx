import React, { Component } from 'react';


export class Slides extends Component {

  render() {

    return(
      <iframe
      height="100%"
      width="100%"
      allowfullscreen="true"
      type="iframe"
      title={title || "[Slides] Effective Pairing and Feedback"}
      src={(url || 'https://docs.google.com/a/hackreactor.com/presentation/d/1pjT5Dgb9DVmxEPe3KvAcjUIRLhsPY458PWPwZ6uce40/embed') + '?start=false&amp;loop=false&amp;delayms=3000'}
      >
      </iframe>
    );
  }

  ComponentDidMount() {
    //Add in event listeners for slides navigation clicks / key presses
    document.getElementsByClassName('div.punch-viewer-left')
      .addEventListener("click", function(){
          // socket.emit('navigate', "L");
      });
    document.getElementsByClassName('div.punch-viewer-right')
      .addEventListener("click", function(){
          // socket.emit('navigate', "R");
      });
  }
}