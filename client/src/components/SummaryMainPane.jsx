import React, { Component } from 'react';
import SummaryInfoBox from './SummaryInfoBox';
import { connect } from 'react-redux';

// this component holds boxes of data about the presentation
class SummaryMainPane extends Component {

  render () {
    console.log("summary main pain",this.props.summary);
    var users = this.props.summary.users;

    let avgClickPerUser = users.reduce(function(sum,curr){
      return sum + Number( curr.no_of_clicks);
    },0)/(users.length-1);
    let questions = this.props.summary.questions.length;
    console.log("questions", questions);

    console.log("avg", avgClickPerUser);

    let clickPerTime = {}

    this.props.summary.clicks.forEach(click=>{
      let time = click.date.split('T')[1].slice(0,5);
      clickPerTime[time] = clickPerTime[time] ? clickPerTime[time]+= 1 : 1;
    });

    console.log("clicks time", clickPerTime);
    return (
      <div id='mainPane' className='summary'>
        <SummaryInfoBox title={'Average click per user'} value={avgClickPerUser}/>
        <SummaryInfoBox title={'Average click per minutes'}/>
        <SummaryInfoBox title={'Max click peak'}/>
        <SummaryInfoBox title={'Number of minuts w/o clicks'}/>
        <SummaryInfoBox title={'Questions'} value={questions}/>
      </div>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    summary : state.summary
  }
}

export default connect(mapStatetoProps)(SummaryMainPane);
