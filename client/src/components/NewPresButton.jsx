import React, { Component } from 'react';
import picker from '../util/googlePicker'; // import Google Picker function

// button to select Google Slides presentation from user's Google Drive to present
class NewPresButton extends Component {

  render () {
    return (
      <button onClick={picker}>New Presentation</button>
    );
  };
};

export default NewPresButton;
