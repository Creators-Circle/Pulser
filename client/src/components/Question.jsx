import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ToggleQuestionUpvoted } from '../util/actions';

class Question extends Component {

  toggleUpvote () {
    let userId = this.props.user.id;
    let questionId = this.props.id;
    let socket = this.props.activeLecture.socket;
    // toggle the upvoted property in store for this question
    let upvoteDownvote = this.props.questions[this.props.id].upvoted ? 'downvoteQuestion' : 'upvoteQuestion';
    // Build an upvote object to pass to the database
    let question = {
      userId: userId,
      questionId: questionId
    };
    // Emit an event that a question was upvoted or downvoted
    socket.emit(upvoteDownvote, question, userId);
    // Update the store to reflect that an upvote/downvote has been fired
    this.props.toggleQuestionUpvoted(this.props.id);
  };

  render () {
    let upvoteImg = this.props.questions[this.props.id].upvoted ? './img/arrows_up-green.svg' : './img/arrows_up.svg';
    return (
      <div className='question' onClick={this.toggleUpvote.bind(this)}>
        <div className='voteContainer'>
          <img src={upvoteImg} className='upvoteDownvote'/>
          <div className='questionVotes'>{this.props.votes}</div>
          </div>
        <span className='questionText'>{this.props.text}</span>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    user: state.user,
    questions: state.questions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionUpvoted: (questionId) => {
      dispatch(ToggleQuestionUpvoted(questionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
