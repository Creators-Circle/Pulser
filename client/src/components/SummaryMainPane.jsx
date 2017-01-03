import React, { Component } from 'react';
import SummaryInfoBox from './SummaryInfoBox';

// this component holds boxes of data about the presentation
class SummaryMainPane extends Component {

  render () {
    return (
      <div id='mainPane' className='summary'>
        <SummaryInfoBox />
        <SummaryInfoBox />
        <SummaryInfoBox />
        <SummaryInfoBox />
        <SummaryInfoBox />
        <SummaryInfoBox />
      </div>
    );
  };
};

export default SummaryMainPane;
