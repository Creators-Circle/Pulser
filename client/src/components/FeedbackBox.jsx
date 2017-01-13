// contains the buttons that an audience can use to interact with the presenter

import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/FeedbackBox.css';
import FeedbackButton from './FeedbackButton';
import QuestionBox from './QuestionBox';
import AudThumbs from './AudThumbs';

class FeedbackBox extends Component {
  render () {
    let title = this.props.title || this.props.activeLecture.name;
    console.log('title: ', title);
    return (
      <div id="FeedbackBox">
        <div className="lecture-title"><h1>{title}</h1></div>
        <hr/>
        <div id="FeedbackButtonContainer">
          <FeedbackButton />
          <hr/>
        </div>
        <div id="AudThumbsContainer">
          <AudThumbs />
        </div>
        <div id="QuestionBoxContainer">
          <QuestionBox role={'audience'}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(FeedbackBox);
