import FeedbackBox from './FeedbackBox';
import Slides from './Slides';
import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from './Navbar';

class AudienceView extends Component {

  componentDidMount () {
    let socket = this.props.activeLecture.socket;
    this.props.dispatch({type: 'CHANGE_ROLE', role: 'audience'});
    socket.on('stopPresentation', function () {
      socket.disconnect();
      browserHistory.push('/');
    });
  };

  render () {
    return (
      <div id="AudienceView">
        <Navbar/>
        <div id="SlidesContainer">
          <Slides id="audienceSlides" class="slides" role="audience" />
        </div>
        <div id="FeedbackBoxContainer">
          <FeedbackBox/>
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

export default connect(mapStateToProps)(AudienceView);
