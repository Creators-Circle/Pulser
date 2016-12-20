// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';
import rd3 from 'rd3';

// define LineChart component from react-d3
const LineChart = rd3.LineChart;

// pass the pulseData coming from redux store
const PulseBox = ({pulseData}) => {
  var lineData = [
    {
      values: pulseData,
      strokeWidth: 3
    }
  ]

  return (
    <div>
      <p>Pulse Box</p>
      <LineChart
        className = 'pulsedata-linechart'
        data={lineData}
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
          // set the maximum value of x to the estimated time of presentation
          // set the maximum value of y to the number of audience
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
