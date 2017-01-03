import React, { Component } from 'react';
import '../css/SummaryView.css';
import SummaryLeftPane from './SummaryLeftPane';
import SummaryMainPane from './SummaryMainPane';

// View to display summary data about the presentation and users
class SummaryView extends Component {

  render () {
    return (
      <div>
        <SummaryLeftPane/>
        <SummaryMainPane/>
      </div>
    );
  }
}

export default SummaryView;
