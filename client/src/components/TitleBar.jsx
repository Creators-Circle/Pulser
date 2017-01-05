//  TitleBar renders at the top of PresenterView.
  // Displays the presentation title and the Date as default lectureTitle.
    //  lectureTitle is editable.
  // Displays lectureID.
  //TODO Make Title editable.

import React, { Component } from 'react';
import { connect } from 'react-redux';

class TitleBar extends Component {
  constructor () {
    super();
    this.date = new Date();
  }

  render () {
    return (
      <div>
       <h1> Lecture Title {this.props.activeLecture.name}</h1>
       <h2> Join Code {this.props.activeLecture.lectureId} </h2>
       <h3> Date {this.date} </h3>
      </div>
    );
  };

};

export default connect(state => state)(TitleBar);
