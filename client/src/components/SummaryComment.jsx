// component for lecture's summary
import React, { Component } from 'react';
import { connect } from 'react-redux';
import postComment from '../util/postComment.js';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      newComment: '', // temporary state for saving new comment
      toggleComment: false // ui state for showing comment or textbox
    };
  }

  toggleView (toggle) {
    this.setState({newComment: this.props.comment});
    this.setState({toggleComment: toggle});
  }
  // sending a post request to the server
  saveComment (lectureId, userId) {
    postComment(lectureId, userId, this.state.newComment)
    .done(() => {
      this.setState({toggleComment: false});
      this.props.upDateComment(userId, this.state.newComment);
    });
  }
  handleChange (event) {
    this.setState({newComment: event.target.value});
  }
  render () {
    // filter user by the either presenter or selected user
    if (this.props.users) {
      let user = !this.props.userId ? this.props.users.filter(user => user.role === 'presenter')[0]
        : this.props.users.filter(user => user.user_id === this.props.userId)[0];
      return (
        <div>
          <p>Comment:</p>
            {
              !this.state.toggleComment ? <div>
                <p>{this.props.comment}</p>
                <button onClick={() => { this.toggleView(true); }} >Edit</button>
              </div>
              : <div>
                <input type = 'text' defaultValue={this.props.comment} onChange={this.handleChange.bind(this)}/>
                <button onClick={() => { this.toggleView(false); }} >Cancel</button>
                <button onClick={() => { this.saveComment(user.lecture_id, user.user_id); }} >Save</button>
              </div>
            }
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.summary.users
  };
};

export default connect(mapStateToProps)(SummaryComment);
