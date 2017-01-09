import React, { Component } from 'react';
import SummaryInfoBox from './SummaryInfoBox';
import { connect } from 'react-redux';

// this component holds boxes of data about the presentation
class SummaryMainPane extends Component {

  render () {
    // store id of the selected user
    let clickedUser = this.props.userId || '';

    // store all the users
    let users = this.props.summary.users;
    let lecture = this.props.summary.lecture[0];

    // compute total number of clicks
    let userClicks = this.props.summary.clicks.filter(click => click.user_id === clickedUser);
    let totalClicks = !clickedUser ? this.props.summary.clicks.length : userClicks.length;

    // compute the average click per user, remove the presenter from the users
    // round to 1 decimal place
    let avgClickPerUser = Math.round((totalClicks / (users.length - 1) * 10)) / 10;
    // total number of questions asked about the lecture
    let questions = !clickedUser ? this.props.summary.questions.length
      : this.props.summary.questions.filter(question => question.user_id === clickedUser).length;
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

    // function for converting minutes, needs to move to a separate file
    const convertToMinutes = (t) => {
      time = t.split(':');
      return Number(time[0]) * 60 + Number(time[1]);
    };
    // convert time to minutes
    let minutes = time.map(convertToMinutes);

    // compute the longest time the users didn't click the feedback button
    let startMinutes = convertToMinutes(lecture.date.split('T')[1].slice(0, 5));
    let endMinutes = convertToMinutes(lecture.end_time.split('T')[1].slice(0, 5));

    let longestMinutesWithOutClicks = 0;

    [startMinutes, ...minutes, endMinutes].forEach((minute, i, totalMinutes) => {
      let difference = Math.abs(totalMinutes[i] - totalMinutes[i + 1]);
      if (difference > longestMinutesWithOutClicks) longestMinutesWithOutClicks = difference;
    });

    let userUpvotes = this.props.summary.upvotes.filter(vote => vote.user_id === clickedUser).length;

    let thumbsCount = this.props.summary.thumbs.filter(thumb => thumb.user_id === clickedUser).length;

    return (
      <div id='mainPane' className='summary'>
        <SummaryInfoBox title={'Average click per minutes'} value={avgClickPerMinute}/>
        {
          !clickedUser ? <SummaryInfoBox title={'Average click per user'} value={avgClickPerUser}/>
          : <div>
              <SummaryInfoBox title={'Upvotes'} value={userUpvotes}/>
              <SummaryInfoBox title={'Thumbs'} value={thumbsCount}/>
            </div>
        }
        <SummaryInfoBox title={'Max click peak'} value={`${clickPerTime[maxPeak]} at ${maxPeak}`}/>
        <SummaryInfoBox title={'Number of minutes w/o clicks'} value={`${longestMinutesWithOutClicks} minutes`}/>
        <SummaryInfoBox title={'Questions'} value={questions} />
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
