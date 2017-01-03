import { connect } from 'react-redux';
import React, { Component } from 'react';

class LogoutButton extends Component {

  render () {
    return (
      <button id="logout">Logout</button>
    );
  }
};

const mapStatetoProps = state => {
  return {user: state.user}; // CHANGE THIS TO WHAT IS NEEDED TO RESET TOKEN/SESSION
};

export default connect(mapStatetoProps)(LogoutButton);
