import React, { Component } from 'react';
import SummaryInfoBox from './SummaryInfoBox';
import { connect } from 'react-redux';

// this component holds boxes of data about the presentation
class SummaryMainPane extends Component {

  render () {
    let clickedUser = this.props.userId || '';
    let filterClickedUser = (data) => { data.user_id === clickedUser; };
    // store all the users
    let users = this.props.summary.users;
    console.log('users', users);

    let userClicks = this.props.summary.clicks.filter(filterClickedUser);
    let totalClicks = !clickedUser ? this.props.summary.clicks.length : userClicks.length;

    console.log('user', userClicks);
    // compute the average click per user, remove the presenter from the users
    // round to 1 decimal place
    let avgClickPerUser = Math.round((totalClicks / (users.length - 1) * 10)) / 10;
    // total number of questions asked about the lecture
    let questions = !clickedUser ? this.props.summary.questions.length
      : this.props.summary.questions.filter(filterClickedUser).length;
    // store count of clicks per minute
    let clickPerTime = {};
    let clicks = !this.props.userId ? this.props.summary.clicks : userClicks;

    clicks.forEach(click => {
      let time = click.date.split('T')[1].slice(0, 5);
      clickPerTime[time] = clickPerTime[time] ? clickPerTime[time] += 1 : 1;
    });
    // copy time of click to an array
    let time = Object.keys(clickPerTime);
    // compute the average click per minute then round to 1 decimal place
    let avgClickPerMinute = Math.round((totalClicks / time.length) * 10) / 10;
    // sort by the highest number of clicks then get the first element
    let maxPeak = time.sort((a, b) => clickPerTime[b] - clickPerTime[a])[0];
    // convert time to minutes
    let minutes = time.map(t => {
      time = t.split(':');
      return Number(time[0]) * 60 + Number(time[1]);
    });
    // compute the longest time the users didn't click the feedback button
    let longestMinutesWithOutClicks = 0;
    for (var i = 0; i < minutes.length - 1; i++) {
      let difference = Math.abs(minutes[i] - minutes[i + 1]);
      if (difference > longestMinutesWithOutClicks) longestMinutesWithOutClicks = difference;
    }
    console.log('user_id', this.props.userId);

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
