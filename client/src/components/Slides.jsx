import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import '../css/Slides.css';

class Slides extends Component {

  render () {
    let embedUrl = this.props.activeLecture.embedUrl;
    let title = this.props.title || this.props.activeLecture.name;
    let id = this.props.activeLecture.presentationId;
    // return <iframe> with embedded google slides presentation
    // current default presentation is "Effective Pairing and Feedback"
    return (
      <iframe
      className="slides"
      id={id}
      allowFullScreen="true"
      type="iframe"
      title={title}
      src={embedUrl}
      >
      </iframe>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(Slides);
