import React, { Component } from 'react';
import { connect } from 'react-redux';

// Input to search database for specific presentation
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
