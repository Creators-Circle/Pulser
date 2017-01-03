import { connect } from 'react-redux';
import React, { Component } from 'react';

// Button to log you out of app
class LogoutButton extends Component {

  render () {
    return (
      <input id='logoutButton' type="button" onClick={ function () { window.location.href = '/logout'; } } value="Logout" />
    );
  }
};

const mapStatetoProps = state => {
  return {user: state.user}; // CHANGE THIS TO WHAT IS NEEDED TO RESET TOKEN/SESSION
};

export default connect(mapStatetoProps)(LogoutButton);
