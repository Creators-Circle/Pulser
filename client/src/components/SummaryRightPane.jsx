// component for display right side of summary view
// filtered either by lecture's summary or selected user's summary
import React, { Component } from 'react';
import SummaryMainPane from './SummaryMainPane';
import SummaryComment from './SummaryComment';
import rd3 from 'rd3';
import { connect } from 'react-redux';
const LineChart = rd3.LineChart;
import timeDiffToMinutes from '../util/timeDiffToMinutes';

class SummaryRightPane extends Component {
  constructor () {
    super();
    this.state = {
      lectureComment: ''
    };
  }

  upDateComment (id, comment) {
    this.setState({lectureComment: comment});
  }

  render () {
    // if userId is undefined display the lecture summary
    if (!this.props.userId) {
      // check if the summary is not empty
      const users = this.props.summary.users;
      if (users) {
        const comment = users.filter(user => user.role === 'presenter')[0].comment;
        return (
          <div className = 'lecture-summary col-md-7 offset-md-1'>
            <SummaryMainPane/>
            <SummaryComment
              comment={this.state.lectureComment || comment}
              upDateComment={this.upDateComment.bind(this)}
            />
          </div>
        );
      } else {
        return null;
      }
    } else {
      // else display user's summary
      const userId = this.props.userId;
      const lecture = this.props.summary.lecture[0];
      const start = new Date(lecture.date);
      const end = new Date(lecture.end_time);
      // filter clicks by selected user
      let clicks = this.props.summary.clicks.filter(click => click.user_id === userId);
      let clicksPerMin = {};

      // compute the time difference and clicks per min
      clicks.map(click => timeDiffToMinutes(start, new Date(click.date)))
        .forEach((time) => {
          let min = Number(time.toString().split('.')[0]);
          clicksPerMin[min + 1] ? clicksPerMin[min + 1] += 1 : clicksPerMin[min + 1] = 1;
        });
      // add the time difference of start and end time of the presentation
      let startToEnd = timeDiffToMinutes(start, end);
      if (!clicksPerMin.hasOwnProperty((startToEnd) + 1)) clicksPerMin[(startToEnd) + 1] = 0;

      let clicksTimeline = [{x: 0, y: 0}];
      let maxClick = 0;
      // check the highest number of clicks, then convert click per minute to x & y format
      for (let min in clicksPerMin) {
        if (clicksPerMin[min] > maxClick) maxClick = clicksPerMin[min];
        clicksTimeline.push({x: Number(min), y: clicksPerMin[min]});
      }
      // set the maximum value of y and x axis of the line chart
      const maxAxisX = clicksTimeline[clicksTimeline.length - 1].x;
      const maxAxisY = maxClick < 8 ? 8 : maxClick + 1;

      const lineData = [
        {
          values: clicksTimeline,
          strokeWidth: 2
        }
      ];
      return (
        <div className ='user-summary-container container col-md-7 offset-md-1'>
          <div className = 'user-summary'>
            <SummaryMainPane userId={userId}/>
            <SummaryComment
              userId={userId}
              comment = {this.props.comment}
              upDateComment = {this.props.upDateComment}
            />
            <div className = 'user-pulse'>
              <LineChart
                className = 'user-pulsedata'
                data={lineData}
                width='80%'
                height='20%'
                viewBoxObject={{x: 0, y: 0, width: 1200, height: 200}}
                circleRadius = {0}
                domain={{x: [0, maxAxisX], y: [0, maxAxisY]}}
                yAxisLabel="No. of Clicks"
                xAxisLabel="Elapsed Time (minutes)"
                gridHorizontal={true}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    summary: state.summary
  };
};
export default connect(mapStateToProps)(SummaryRightPane);
