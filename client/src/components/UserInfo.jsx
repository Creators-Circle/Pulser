import React, { Component } from 'react';
import { connect } from 'react-redux';

// component to display basic user data (profile pic + name)
class UserInfo extends Component {

  render () {
    return (
      <div id='userInfo'>
        <img id='profilePic' src={this.props.user.avatar} />
        <p>{this.props.user.name}</p>
      </div>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    user: state.user
  };
};

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific parts of the state that you want to import

export default connect(mapStatetoProps)(UserInfo);
