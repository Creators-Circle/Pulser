import React, { Component } from 'react';
import picker from '../util/googlePicker'; // import Google Picker function

class NewPresButton extends Component {

  render () {
    
      return (
        <button onClick={picker}>New Presentation</button>
      );

  };
};

export default NewPresButton;