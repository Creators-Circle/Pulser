import React, { Component } from 'react';
import { connect } from 'react-redux';
import postComment from '../util/postComment.js';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      comment: '', // tempory state for comment to prevent summary view from re-rendering
      toggleComment: false // ui state for showing comment or textbox
    };
  }

  componentWillMount () {
    // set a default comment when the component loads, need to refactor later for user summary
    this.setState({comment: this.props.users.filter(user => user.role === 'presenter')[0].comment});
  }

  // changing ui state for editing comment
  toggleView (toggle) {
    this.setState({toggleComment: toggle});
  }
  // sending a post request to the server
  saveComment (lectureId, userid) {
    postComment(lectureId, userid, this.state.comment);
    this.setState({toggleComment: false});
  }

  handleChange (event) {
    this.setState({comment: event.target.value});
  }

  render () {
    // need to refactore later for specific user
    let user = this.props.users.filter(user => user.role === 'presenter')[0];
    return (
      <div>
        <p>Comment:</p>
        {
          !this.state.toggleComment ? <div>
            <p>{this.state.comment}</p>
            <button onClick={() => { this.toggleView(true); }} >Edit</button>
          </div>
          : <div>
            <input type = 'text' value={this.state.comment} onChange={this.handleChange.bind(this)}/>
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
