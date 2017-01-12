import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';

class Navbar extends Component {
  render () {
    return (
      <div id="NavbarContainer">
        <span id="brandContainer">
          <span><img id="logo" src='../../public/img/logo.png'/>FollowMe</span>
        </span>
        <span id="UserInfoContainer">
          <UserInfo/>
        </span>
        <span id="LogoutButtonContainer">
          <LogoutButton/>
        </span>
      </div>
    );
  };
};

export default Navbar;
