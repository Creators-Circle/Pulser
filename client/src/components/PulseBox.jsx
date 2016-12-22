// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';
import rd3 from 'rd3';
import timeDiffToMinutes from '../util/timeDiffToMinutes';
import React, { Component } from 'react';
// define LineChart component from react-d3
const LineChart = rd3.LineChart;

class PulseBox extends Component {

  render () {
    var currTime = new Date();
    var timeDiff = timeDiffToMinutes(this.props.presentationStartTime, currTime);

    // filter every data with less than (n)minutes time
    // compare the time to 1 minute for testing
    var filteredPulse = this.props.pulseData.filter(pulse => Math.abs(timeDiff - pulse.x) <= 1);

    // set the min and max of x axis with the time value of the first element from filteredPulse
    var xMin = filteredPulse[0].x;
    var xMax = filteredPulse[0].x + 1;
    // need to set lineData prior to return statement to preserve "this" context
    var lineData = [
      {
        values: filteredPulse,
        strokeWidth: 2
      }
    ];

    // Render "stock ticker" style line graph
    return (
      <div>
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
            // set the maximum value of y to the number of audience
            { x: [xMin, xMax], y: [0, 5] }
          }
          xAxisLabel="Elapsed Time (minutes)"
          gridHorizontal={true}
        />
      </div>
    );
  }

  // Add Socket.io listener for FeedbackButton increments (and subsequent decrements)
  componentWillMount () {
    let startTime = this.props.presentationStartTime;
    let dispatch = this.props.dispatch; // set keyword "this"
    socket.on('updatedPulse', function (action, currTime) {
      // compute the time difference and pass it with the action
      let timeDifference = timeDiffToMinutes(startTime, currTime);
      // Dispatch either DECREMENT or INCREMENT action
      dispatch({
        type: action,
        time: timeDifference
      });
    });
  }
};

// get the pulseData from redux store
// REFACTOR LATER
// const mapStatetoProps = (state) => {
//   return {
//     pulseData: state.pulseData,
//     presentationStartTime: state.presentationStartTime
//   };
// };
export default connect(state => state)(PulseBox);
