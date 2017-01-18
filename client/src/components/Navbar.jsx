import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';
import '../css/Navbar.css';
import { Link } from 'react-router';

class Navbar extends Component {
  render () {
    return (
      <div id="NavbarContainer">
        <div id="BrandContainer">
          <Link to={'/'}><img id="logo" className="navbarElement" src='/../img/logo.png'/><span>FollowMe</span></Link>
        </div>
        <LogoutButton/>
        <UserInfo/>
      </div>
    );
  };
};

export default Navbar;
