import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
// This renders each individual question text with an upvote button - need to add handler for upvote button
class Question extends Component {

  upvoteQuestion () {
    let socket = this.props.activeLecture.socket;
    let dispatch = this.props.dispatch;
    // Build an upvote object to pass to the database
    let upvote = {
      userId: this.props.user.id,
      questionId: this.props.id
    };
    // Emit an event that a question was upvoted
    socket.emit('upvoteQuestion', upvote);
    // Listen for upvotes and dispatch them to the store
    socket.on('upvoteQuestion', function (upvote) {
      // console.log('upvote received ', upvote);
      dispatch({
        type: 'UPVOTE',
        questionId: upvote.questionId
      });
    });
  }

  render () {
  	console.log("this.props in question");
    return (
      <div>
       <button id="upvote" onClick={this.upvoteQuestion.bind(this)}>Upvote</button>
       <span>{this.props.text}</span>
     </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    user: state.user
  };
};

export default connect(mapStateToProps)(Question);
