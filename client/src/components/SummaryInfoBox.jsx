import React, { Component } from 'react';

// this component is meant to display different sets of data about each presentation
  // ex: avg clicks/minute, highest amount of clicks at one time, avg clicks per student, etc
class SummaryInfoBox extends Component {

  render () {
    return (
      <div className='summaryInfoBox'>
        <img src='http://png.clipart.me/graphics/thumbs/103/presentation-template-with-six-colored-text-box_103671569.jpg' />
        <span><strong>Title</strong></span><br/>
        <span>Sept 23, 5:02 PM</span>
      </div>
    );
  };
};

export default SummaryInfoBox;
