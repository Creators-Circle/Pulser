import React, { Component } from 'react';
import '../css/SummaryView.css';
import SummaryLeftPane from './SummaryLeftPane';
import SummaryMainPane from './SummaryMainPane';
import getLectureSummary from '../util/getLectureSummary';

// View to display summary data about the presentation and users
class SummaryView extends Component {
  componentWillMount () {
    let lectureId = 'cc0001';
    getLectureSummary(lectureId, (summary) => {
      console.log('summary', summary);
    });
  }

  render () {
    return (
      <div>
        <h1>Summary</h1>
        <SummaryLeftPane/>
        <SummaryMainPane/>
      </div>
    );
  }
}

export default SummaryView;
