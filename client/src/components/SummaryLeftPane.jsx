import React, { Component } from 'react';
import UserClicksTimeline from './UserClicksTimeline';
import TotalClicksTable from './TotalClicksTable';

// left dislplay box for SummaryView
  // displays either a table of total # of clicks per user
  // or displays the timeline of a specific user's clicks
class SummaryLeftPane extends Component {

  render () {
    let userview = false; // Temporary variable to be replaved with state value
    if (!userview) {
      return (
        <TotalClicksTable />
      );
    } else {
      return (
        <UserClicksTimeline />
      );
    }
  };
};

export default SummaryLeftPane;
