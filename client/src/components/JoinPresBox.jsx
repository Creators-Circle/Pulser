import React, { Component } from 'react';

// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {

  render () {
    return (
      <div id='joinBox'>
        <input id='join' type='text' /><br/>
        <button>Join a presentation</button>
      </div>
    );
  };
};

export default JoinPresBox;
