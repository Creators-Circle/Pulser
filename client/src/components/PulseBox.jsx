// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';
import rd3 from 'rd3';
import timeDiffToMinutes from '../util/timeDiffToMinutes';
import React, { Component } from 'react';
import $ from 'jquery';
// define LineChart component from react-d3
const LineChart = rd3.LineChart;

class PulseBox extends Component {
  
  render () {
    // console.log('props in pulseBox render: ', this.props);
    var currTime = new Date();
    var timeDiff = timeDiffToMinutes(this.props.startTime, currTime);

    // filter every data with less than (n)minutes time
    // compare the time to 1 minute for testing
    var filteredPulse = this.props.pulseData.filter(pulse => {
      return Math.abs(timeDiff - pulse.x) <= 0.5;
    });
    // if filteredPulse is empty, populate it with a default 0,0 data point
    if (!filteredPulse.length) {
      filteredPulse = [{x: 0, y: 0}];
    }

    // set the min and max of x axis with the time value of the first element from filteredPulse
    var xMin = filteredPulse[0].x;
    var xMax = filteredPulse[0].x + 0.5;
    let audience = this.props.audience > 4 ? this.props.audience : 4;
    // if the number of clicks reaches 70% of number of audience, display a warning for the presenter
    if (filteredPulse[filteredPulse.length - 1].y > (audience * 0.70)) {
      $('.pulse-box').addClass('alert-red');
      setTimeout(function () {
        $('.pulse-box').removeClass('alert-red');
      }, 5000);
    }

    // need to set lineData prior to return statement to preserve "this" context
    var lineData = [
      {
        values: filteredPulse,
        strokeWidth: 2
      }
    ];

    // Render "stock ticker" style line graph
    return (
      <div className = "pulse-box">
        <LineChart
          className = 'pulsedata-linechart'
          data={lineData}
          width='100%'
          height='20%'
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 1200,
            height: 200
          }
          }
          circleRadius = {0}
          domain={
            // set the maximum value of x to the estimated time of presentation
            // set the maximum value of y to the number of audience members
            { x: [xMin, xMax], y: [0, audience] }
          }
          xAxisLabel="Elapsed Time (minutes)"
          gridHorizontal={true}
        />
      </div>
    );
  }

  // Add Socket.io listener for FeedbackButton increments (and subsequent decrements)
  componentWillMount () {
    // Set keyword this
    let socket = this.props.activeLecture.socket;
    let startTime = this.props.startTime;
    let dispatch = this.props.dispatch;
    // Socket event handler for an audience click that updates the presenter's pulse graph x axis
    socket.on('updatedPulse', (action, currTime) => {
      // compute the time difference and pass it with the action
      let timeDifference = timeDiffToMinutes(startTime, currTime);
      // Dispatch either DECREMENT or INCREMENT action
      dispatch({
        type: action,
        time: timeDifference
      });
    });
    // Socket event handler for an audience click that updates that audience member's array of clicks in the store
    socket.on('userClicked', (action, currTime, user) => {
      let timeDifference = timeDiffToMinutes(startTime, currTime);
      dispatch({
        type: action,
        time: timeDifference,
        user: user
      });
    });
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture,
    pulseData: state.pulseData
  };
};

export default connect(mapStateToProps)(PulseBox);
