// Component to display embedded Goolge Slides presentation
import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class Slides extends Component {

  render () {
    let embedUrl = this.props.activeLecture.embedUrl;
    // return <iframe> with embedded google slides presentation
    // current default presentation is "Effective Pairing and Feedback"
    return (
      <iframe
      className="slides"
      id={this.props.id}
      allowFullScreen="true"
      type="iframe"
      title={ undefined /* <-- Will need to be replaced with variable */ || '[Slides] Effective Pairing and Feedback' }
      src={embedUrl}
      >
      </iframe>
    );
  }

  componentDidMount () {
    // TODO: Add in event listeners for slides navigation clicks / key presses
  }
}

export default connect(state => state)(Slides);
