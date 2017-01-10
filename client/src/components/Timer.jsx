import React, { Component } from 'react';
import $ from 'jquery';
// Timer/stopwatch to keep track of time during presentation
class Timer extends Component {
  render () {
    return (
      <iframe id="Timer" src='http://ipadstopwatch.com/embed.html' frameBorder="0" scrolling="no" width="391" height="70"></iframe>
    );
  }
};

export default Timer;
