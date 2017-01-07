import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
// This renders each question in the store with an upvote button
// each question receives its text and ID as props from QuestionBox
class Question extends Component {
  constructor (props) {
    super();
    this.socket = props.activeLecture.socket;
    let dispatch = props.dispatch;
    this.socket.on('upvoteQuestion', function (upvote) {
      dispatch({
        type: 'UPVOTE',
        questionId: upvote.questionId
      });
    });
    this.socket.on('downvoteQuestion', function (downvote) {
      dispatch({
        type: 'DOWNVOTE',
        questionId: downvote.questionId
      });
    });
  }

  componentDidMount () {
    let toggleUpvote = this.toggleUpvote.bind(this);
    $('#toggleUpvote').on('click', toggleUpvote);
  }

  toggleUpvote () {
    // toggle the upvoted property in store for this question
    let upvoteDownvote = this.props.questions[this.props.id].upvoted ? 'downvoteQuestion' : 'upvoteQuestion';
    // Build an upvote object to pass to the database
    let question = {
      userId: this.props.user.id,
      questionId: this.props.id
    };
    // Emit an event that a question was upvoted or downvoted
    this.socket.emit(upvoteDownvote, question);
    // Update the store to reflect that an upvote/downvote has been fired
    this.props.dispatch({
      type: 'TOGGLE_UPVOTED',
      questionId: this.props.id
    });
    // change the text of the upvote/downvote button
    if ($('#upvoteDownvote').text() === 'Upvote') {
      $('#upvoteDownvote').text('Downvote');
    } else {
      $('#upvoteDownvote').text('Upvote');
    }
  }

  render () {
    // console.log('this.props in question', this.props);
    return (
      <div>
       <button id="upvoteDownvote" onClick={this.toggleUpvote.bind(this)}>Upvote</button>
       <span>{this.props.text}</span>
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

export default connect(mapStateToProps)(Question);
