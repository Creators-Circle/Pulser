import React, { Component } from 'react';
import picker from '../util/googlePicker'; // import Google Picker function
import io from 'socket.io-client';

// button to select Google Slides presentation from user's Google Drive to present
class NewPresButton extends Component {

  setPresentation () {
    // Generate a random, 6 character string to name the socket 'room' for that presentation
    let roomId = (Math.random().toString(36) + '00000000000000000').slice(2, 8);
    // Join the presenter to that room
    socket.emit('joinRoom', roomId);
    // TODO: PUT THE CODE SOMEWHERE
  }

  render () {
    return (
    <div>
      <button onClick={this.setPresentation}>TempGenerator</button>
      <button onClick={picker}>New Presentation</button>
    </div>
    );
  };
};

export default NewPresButton;
