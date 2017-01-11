// container for PresenterView component
import React, { Component } from 'react';
import PresenterView from './PresenterView';
import $ from 'jquery';
import timeDiffToMinutes from '../util/timeDiffToMinutes';

class PresenterViewContainer extends Component {
  constructor () {
    super();
    // set the start time when this compnent loads
    this.startTime = new Date();
    this.state = {
      time: undefined,
      duration: undefined
    };
  }

  timer () {
    // set the current date
    let time = new Date();
    let hours = time.getHours().toString();
    let minutes = time.getMinutes().toString();
    let seconds = time.getSeconds().toString();
    // format the current time
    let clock = `${this.parseTime(hours)} : ${this.parseTime(minutes)}`;
    // check the difference of start time and current time
    let diff = Math.abs(timeDiffToMinutes(this.startTime, time));
    this.setState({duration: this.convertDuration(diff)});
    this.setState({time: clock});
  }
  // function for computing the duration
  convertDuration (minutes) {
    let hours, min, sec;
    hours = Math.round(minutes / 60);
    min = Math.round(minutes % 60);
    sec = Math.round((minutes * 60) % 60);
    return `${this.parseTime(hours)} : ${this.parseTime(min)} : ${this.parseTime(sec)}`;
  }
  // function for formating time to a 2-digit number
  parseTime (time) {
    time = time.toString();
    if (time.length < 2) {
      return `0${time}`;
    }
    return time;
  }

  componentDidMount () {
    this.timer();
    setInterval(this.timer.bind(this), 1000);
  }

  render () {
    return (
      <div className = 'presenter'>
        <div className='timer-bug'>
          <h1 className='clock'>Time: {this.state.time}</h1>
          <h2>Duration: {this.state.duration}</h2>
        </div>
        <PresenterView />
      </div>
    );
  }
}

export default PresenterViewContainer;
