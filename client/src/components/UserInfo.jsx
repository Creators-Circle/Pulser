import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';
import '../css/UserInfo.css';
// component to display basic user data (profile pic + name)
class UserInfo extends Component {

  render () {
    return (
      <span id='userInfo'>
        <img id='profilePic' src={this.props.user.avatar} />
      </span>
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
