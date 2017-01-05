//  TitleBar renders at the top of PresenterView.
  // Displays the presentation title and the Date as default lectureTitle.
    //  lectureTitle is editable.
  // Displays lectureID.
  // TODO Make Title editable.

import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleBar extends Component {
  constructor () {
    super();
    // Date set-up here so it only calculates once.
    this.d = new Date();
    this.now = this.d.getHours() + ':' + this.d.getMinutes() + '  ' + this.d.getDate() + '-' + (this.d.getMonth() + 1) + '-' + this.d.getFullYear();
  }

  render () {
    return (
      <div>
       <h1> Lecture Title {this.props.activeLecture.name} </h1>
       <h2> Join Code {this.props.activeLecture.lectureId} </h2>
       <h3> Date {this.now} </h3>
      </div>
    );
  };

};

export default connect(state => state)(TitleBar);
