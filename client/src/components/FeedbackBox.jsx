import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/FeedbackBox.css';
import FeedbackButton from './FeedbackButton';
import QuestionBox from './QuestionBox';
import AudThumbs from './AudThumbs';

// Holds the audience interaction components
// Contains
  // FeedbackButton
  // QuestionBox
  // AudThumbs
class FeedbackBox extends Component {
  render () {
    let title = this.props.title || this.props.activeLecture.name;
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
