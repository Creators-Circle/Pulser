import React, { Component } from 'react';
import { connect } from 'react-redux';
import postComment from '../util/postComment.js';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      toggleComment: false // ui state for showing comment or textbox
    };
  }
  // changing ui state for editing comment
  toggleView (toggle) {
    this.setState({toggleComment: toggle});
  }
  // sending a post request to the server
  saveComment (lectureId, userid) {
    postComment(lectureId, userid, this.state.newComment);
    this.setState({toggleComment: false});
  }
  handleChange (event) {
    this.setState({newComment: event.target.value});
  }

  render () {
    // filter user by the either presenter or selected user
    let user = !this.props.userId ? this.props.users.filter(user => user.role === 'presenter')[0]
      : this.props.users.filter(user => user.user_id === this.props.userId)[0];
    return (
      <div>
        <p>Comment:</p>
        {
          !this.state.toggleComment ? <div>
            <p>{user.comment}</p>
            <button onClick={() => { this.toggleView(true); }} >Edit</button>
          </div>
          : <div>
            <input type = 'text' defaultValue={user.comment} onChange={this.handleChange.bind(this)}/>
            <button onClick={() => { this.toggleView(false); }} >Cancel</button>
            <button onClick={() => { this.saveComment(user.lecture_id, user.user_id); }} >Save</button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.summary.users
  };
};

export default connect(mapStateToProps)(SummaryComment);
