import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';
import '../css/Navbar.css';
import { Link } from 'react-router';

// Holds user info.  Renders on top of most pages.
// Contains
  // LogoutButton
  // UserInfo
class Navbar extends Component {
  render () {
    return (
      <div id="NavbarContainer">
        <div id="BrandContainer"><img id="logo" className="navbarElement" src='/../img/logo.png'/>
          <Link to={'/'}><span>FollowMe</span></Link>
        </div>
        <LogoutButton/>
        <UserInfo/>
      </div>
    );
  };
};

export default Navbar;
