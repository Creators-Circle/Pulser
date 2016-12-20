// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';
import rd3 from 'rd3';

// define LineChart component from rd3
const LineChart = rd3.LineChart;

// dummy data to test the LineChart
var lineData = [
  {
    values: [ { x: 0.0166667, y: 0 }, { x: 0.0333333, y: 1 }, { x: 0.0833333, y: 2 }, { x: 0.366667, y: 2 }, { x: 0.45, y: 3 } ],
    strokeWidth: 3
  }
];

// pass the pulseData coming from redux store
const PulseBox = ({pulseData}) => {
  var test = (y) => {
    lineData[0].values.push({ x: 100, y: y })
  }

  return (
    <div>
      <p>Pulse Box</p>
      {pulseData}
      <LineChart
        className = 'pulsedata-linechart'
        data={lineData}// replace this with pulseData
        width='100%'
        height={400}
        viewBoxObject={{
          x: 0,
          y: 0,
          width: 1200,
          height: 200
        }
        }
        circleRadius = {0}
        domain={
          // set the maximum value of x to the number of audience
          // set the maximum value of y to the estimated time of presentation
          { x: [0, 20], y: [0, 18] }
        }
        xAxisLabel="Elapsed Time (minutes)"
        gridHorizontal={true}
      />
    </div>
  );
};

// get the pulseData from redux store
const mapStatetoProps = (state) => {
  return {pulseData: state.pulseData};
};
export default connect(mapStatetoProps)(PulseBox);
