import React, { Component } from 'react';
import SummaryInfoBox from './SummaryInfoBox';
import { connect } from 'react-redux';

// this component holds boxes of data about the presentation
class SummaryMainPane extends Component {

  render () {
    console.log('summary main pain', this.props.summary);
    // store all the users
    var users = this.props.summary.users;
    // compute total number of clicks
    let totalClicks = users.reduce(function (sum, curr) {
      return sum + Number(curr.no_of_clicks);
    }, 0);
    // compute the average click per user, remove the presenter from the users
    let avgClickPerUser = totalClicks / (users.length - 1);
    // total number of questions asked about the lecture
    let questions = this.props.summary.questions.length;
    // store count of clicks per minute
    let clickPerTime = {};
    this.props.summary.clicks.forEach(click => {
      let time = click.date.split('T')[1].slice(0, 5);
      clickPerTime[time] = clickPerTime[time] ? clickPerTime[time] += 1 : 1;
    });
    // copy time of click to an array
    let time = Object.keys(clickPerTime);
    // compute the average click per minute
    let avgClickPerMinute = totalClicks / time.length;
    // sort by the highest number of clicks then get the first element
    let maxPeak = time.sort((a, b) => clickPerTime[b] - clickPerTime[a])[0];
    // convert time to minutes
    let minutes = time.map(t => {
      time = t.split(':');
      return Number(time[0]) * 60 + Number(time[1]);
    });
    // compute the longest time the users didn't click the feedback button
    var longestMinutesWithOutClicks = 0;
    for (var i = 0; i < minutes.length - 1; i++) {
      let difference = Math.abs(minutes[i] - minutes[i + 1]);
      if (difference > longestMinutesWithOutClicks) longestMinutesWithOutClicks = difference;
    }

    return (
      <div id='mainPane' className='summary'>
        <SummaryInfoBox title={'Average click per user'} value={avgClickPerUser}/>
        <SummaryInfoBox title={'Average click per minutes'} value={avgClickPerMinute}/>
        <SummaryInfoBox title={'Max click peak'} value={`${clickPerTime[maxPeak]} at ${maxPeak}`}/>
        <SummaryInfoBox title={'Number of minutes w/o clicks'} value={`${longestMinutesWithOutClicks} minutes`}/>
        <SummaryInfoBox title={'Questions'} value={questions}/>
      </div>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    summary: state.summary
  };
};

export default connect(mapStatetoProps)(SummaryMainPane);
