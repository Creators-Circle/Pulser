//  TitleBar renders at the top of PresenterView.
  // Displays the presentation title and the Date as default lectureTitle.
    //  lectureTitle is editable.
  // Displays lectureID.

  // Appears that currently the presentation name is not stored in state when presentation picked via googlePicker.
    //  Will check in with Ross tomorrow on that.

import React, { Component } from 'react';
import UserInfo from './UserInfo';
import { Link } from 'react-router';
import { connect } from 'react-redux';


class TitleBar extends Component {

  render () {
    return (
      <div>
       <h1> Lecture Title  {this.props.date}</h1>
       <h2> LectureId {this.props.LectureId} </h2>
      </div>
    );
  };
};

export default TitleBar;
