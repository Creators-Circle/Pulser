// component for display right side of summary view
// filtered either by lecture's summary or selected user's summary
import React, { Component } from 'react';
import SummaryMainPane from './SummaryMainPane';
import SummaryComment from './SummaryComment';
import rd3 from 'rd3';
import { connect } from 'react-redux';
const LineChart = rd3.LineChart;

class SummaryRightPane extends Component {
  constructor () {
    super();
    this.state = {
      lectureComment: ''
    };
  }

  componentWillMount () {
    const comment = this.props.summary.users.filter(user => user.role === 'presenter')[0].comment;
    this.setState({lectureComment: comment});
  }

  upDateComment (id, comment) {
    this.setState({lectureComment: comment});
  }

  render () {
    // let userClicks = this.props.clicks.filter(click => click.user_id === this.props.userId)
    // .map(click=> {return{x:click.date,y:1} });
    //
    // console.log(this.props.userId,"summary clicks", userClicks);
    // const lineData = [
    //   {
    //     values: [{x:1,y:0},{x:2,y:4}],
    //     strokeWidth: 2
    //   }
    // ];

    // if userId is undefined display the lecture summary
    if (!this.props.userId) {
      return (
        <div>
          <SummaryMainPane/>
          <SummaryComment
            comment={this.state.lectureComment}
            upDateComment={this.upDateComment.bind(this)}
          />
        </div>
      );
    } else {
      // else display user's summary
      return (
        <div>
          <SummaryMainPane userId={this.props.userId}/>
          <SummaryComment
            userId={this.props.userId}
            comment = {this.props.comment}
            upDateComment = {this.props.upDateComment}
          />
          {/* <LineChart
            className = 'user-pulsedata'
            data={lineData}
            width='80%'
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
              { x: [0, 4], y: [0, 1]}
            }
            xAxisLabel="Elapsed Time (minutes)"
            gridHorizontal={true}
          /> */}
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
