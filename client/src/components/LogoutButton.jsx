import { connect } from 'react-redux';
import React, { Component } from 'react';
import '../css/LogoutButton.css';

// Logs out.
class LogoutButton extends Component {

  render () {
    return (
      <input id='LogoutButton' className='btn btn-blue' type="button" onClick={ function () { window.location.href = '/logout'; } } value="Logout" />
    );
  }
};

const mapStatetoProps = state => {
  return {user: state.user};
};

export default connect(mapStatetoProps)(LogoutButton);
