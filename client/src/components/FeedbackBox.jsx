// contains the buttons that an audience can use to interact with the presenter

import FeedbackButton from './FeedbackButton';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackBox extends Component {
  render () {
    let title = this.props.title || this.props.activeLecture.name;
    console.log('title: ', title);
    return (
      <div>
        <h2>{title}</h2>
        <div id="FeedbackButtonContainer">
          <FeedbackButton />
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
