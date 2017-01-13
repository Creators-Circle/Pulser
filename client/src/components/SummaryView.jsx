import React, { Component } from 'react';
import '../css/SummaryView.css';
import getLectureSummary from '../util/getLectureSummary';
import { connect } from 'react-redux';
import SummaryLeftPane from './SummaryLeftPane';
import SummaryRightPane from './SummaryRightPane';
import Navbar from './Navbar';

// Displays summary data about the presentation and users
// Contains
  // SummaryLeftPane
  // SummaryRightPane
class SummaryView extends Component {

  componentWillMount () {
    let lectureId = this.props.params.lectureId;
    // once this component loads, it gets the summary from the server and store it to the store
    getLectureSummary(lectureId, (summary) => {
      this.props.dispatch({
        type: 'UPDATE_SUMMARY',
        summary: summary
      });
    });
  }

  render () {
    if (this.props.summary) {
      return (
        <div>
          <Navbar/>
          <div className='container-fluid summary-main'>
            <h1 className='summary-title'>
              <i className="fa fa-line-chart"></i>
              Summary: <span>{ this.props.summary.lecture === undefined
                ? '' : this.props.summary.lecture[0].name }</span>
            </h1>
            <div className='row'>
              <SummaryLeftPane/>
              <SummaryRightPane/>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <p>rendering</p>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    summary: state.summary,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(SummaryView);
