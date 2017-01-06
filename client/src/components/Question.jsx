import React, { Component } from 'react';

// This renders each individual question text with an upvote button - need to add handler for upvote button
class Question extends Component {

  render () {
    return (
      <div>
       <button>Upvote</button>
       <span>{this.props.text}</span>
     </div>
    );
  };
};

export default Question;
