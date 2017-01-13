import React, { Component } from 'react';
import TotalClicksTable from './TotalClicksTable';

// left dislplay box for SummaryView
  // displays either a table of total # of clicks per user
  // or displays the timeline of a specific user's clicks
class SummaryLeftPane extends Component {

  render () {
    return (
      <TotalClicksTable />
    );
  };
};

export default SummaryLeftPane;
