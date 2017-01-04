//TitleBar renders at the top of PresenterView.
  // Displays the presentation title and the Date as default lectureTitle.
    //lectureTitle is editable.
  // Displays lectureID.

import React, { Component } from 'react';
import UserInfo from './UserInfo';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// view that every user sees after logging in
class TitleBar extends Component {

  render () {
    return (
      <div>
       <h1> Placeholder </h1>
      </div>
    );
  };
};

export default TitleBar;