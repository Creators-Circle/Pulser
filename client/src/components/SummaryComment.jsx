import React, { Component } from 'react';
import { connect } from 'react-redux';

class SummaryComment extends Component {
  constructor () {
    super();
    this.state = {
      toggleComment: false // ui state for showing comment or textbox
    };
  }

  toggleView (toggle) {
    this.setState({toggleComment: toggle});
  }

  render () {
    // need to refactore later for specific user
    let user = this.props.users.filter(user => user.role === 'presenter')[0];
    return (
      <div>
        <p>Comment:</p>
        {
          !this.state.toggleComment ? <div>
            <p>{user.comment}</p>
            <button onClick={() => { this.toggleView(true); }} >Edit</button>
          </div>
          : <div>
            <input type = 'text' placeholder='Enter comment'/>
            <button onClick={() => { this.toggleView(false); }} >Cancel</button>
            <button onClick={() => { this.toggleView(false); }} >Save</button>
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
