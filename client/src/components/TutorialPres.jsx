import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import store from '../store.jsx';

import LogoutButton from './LogoutButton';
import Navbar from './Navbar';
import PresThumbs from './PresThumbs';
import PulseBox from './PulseBox';
import QuestionBox from './QuestionBox';
import Slides from './Slides';
import SummaryView from './SummaryView';
import Sidebar from './Sidebar';
import TitleBar from './TitleBar';

import rd3 from 'rd3';
const LineChart = rd3.LineChart;
import timeDiffToMinutes from '../util/timeDiffToMinutes';

import $ from 'jquery';

class PresenterView extends Component {
  constructor (props) {
    super(props);
    const startTime = new Date();
    this.date = new Date();
    this.state = {
      audience: 8,
      startTime: startTime,
      lineData: [{
        values: [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
        strokeWidth: 2
      }],
      questions: {
        1: {votes: 2,
          questionText: 'This question has two upvotes.',
          upvoted: false},
        2: {votes: 1,
          questionText: 'You are the only one to upvote this question.',
          upvoted: true},
        3: {votes: 3,
          questionText: 'You are one of three to upvote this question.',
          upvoted: true}
      },
      toggleTitleBox: false,
      title: 'Tutorial Presentation'
    };
    setInterval(() => {
      console.log('adding a point to pulse');
    }, 3000);
    setInterval(() => {
      console.log('removing a point from pulse');
    }, 5000);
  }

  componentDidMount () {
    const startTime = this.state.startTime;
    let seconds = 0;
    let minutes = 0;
    function runClock () {
      const today = new Date();
      const h = today.getHours();
      let m = today.getMinutes();
      m = checkTime(m);
      seconds = checkSeconds(seconds);
      $('.clock').empty().append(`<div class="col-md-12" id="clock"><span id="hours">${h}</span>
        : <span id="minutes">${m}</span>`);
      $('.duration').empty().text(`00:${checkTime(minutes)}:${checkTime(seconds)}`);
      setTimeout(runClock, 1000);
    }
    function checkTime (i) {
      if (i < 10) {
        i = '0' + i;
      }
      return i;
    }
    function checkSeconds (s) {
      if (++s < 60) {
        return s;
      } else {
        minutes++;
        return 0;
      }
    }
    runClock();
  }

  render () {
    const currTime = new Date();
    const timeDiff = timeDiffToMinutes(this.state.startTime, currTime);
    const xMin = 0;
    const xMax = 10;
    return (
      <div className='presenter-view-container'>
        <Navbar/>
        <div className = 'tutorial-view-container'>
          <div className="row">
            <div className="col-md-8">
              <div id='PulseBox' className = "pulse-box">
                <span id="GraphTitle">Pulse
                  <hr/>
                  <LineChart
                    className = 'pulsedata-linechart'
                    data={this.state.lineData}
                    width='100%'
                    height='20%'
                    viewBoxObject={{
                      x: 0,
                      y: 0,
                      width: 1200,
                      height: 280
                    }}
                    circleRadius = {0}
                    domain={
                      { x: [0, 10], y: [0, 8] }
                    }
                    gridHorizontal={true}
                    gridVertical={true}
                  />
                </span>
              </div>

              <div id='QuestionBoxPresenter' style={{width: '45%'}}>
                <div id="QuestionBox">
                  <h2>Questions</h2>
                  <hr/>
                  <input className='form-control presenter-input' key={1} type="text" id="questionInput"></input>
                  <button className='btn submit-btn' key={2} id="submitQuestion" /* stuff to add a question clickhandler */>Submit</button>
                  {Object.keys(this.state.questions).map((questionId, i) =>
                    (
                      <div className='question' /* handle toggle upvote stuff */>
                        <div className='voteContainer'>
                          <img src={this.state.questions[questionId].upvoted ? '../img/arrows_up-green.svg' : '../img/arrows_up.svg'} className='upvoteDownvote'/>
                          <div className='questionVotes'>{this.state.questions[questionId].votes.toString()}</div>
                          </div>
                        <span className='questionText'>{this.state.questions[questionId].questionText}</span>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div id='PresThumbs' style={{width: '45%'}}>
                <h2 id='topicTitle'>Topic: </h2>
                <input className='form-control presenter-input' id='topic' type='text' name='topic' />
                <button className='btn submit-btn' id='setTopic' /* handle topic setting click here */>Set Topic</button>
                <hr />
                <div className='thumbs-list'>
                  <ul>
                    <li>
                      <p>1</p>
                      <img src='../img/1-thumb.png' alt='thumbs-up'/>
                    </li>
                    <li>
                      <p>1</p>
                      <img src='../img/2-thumb.png' alt='thumbs-side'/>
                    </li>
                    <li>
                      <p>1</p>
                      <img src='../img/3-thumb.png' alt='thumbs-down'/>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div className="col-md-4" style={{'paddingRight': '3vw'}}>

              <div id="Sidebar" style={{'marginTop': '2vh'}}>
                <div>
                  <div className='lecture-title'>
                    <h1><span>{this.state.newTitle || 'Tutorial Presentation'} </span>
                    </h1>
                  </div>
                  <hr/>
                  <div className='sidebar-header'>
                    <h2>SHARE CODE</h2>
                    <p>6ChAr$</p>
                  </div>
                  <hr/>
                  <div className='timer'>
                    <div className='clock'></div>
                    <div className='sidebar-header'>
                      <h2>DURATION</h2>
                      <p className="duration"></p>
                    </div>
                    <hr/>
                  </div>
                </div>

                <div className='row tools-row allow-guest'>
                  <span>Permit Guests<input type="checkbox" id='guestsToggle'></input></span>
                </div>

                <hr/>

                <div className='row tools-row '>
                  <div className='offset-md-1'>
                    <a href='#' target="_blank"><button className='btn tool-btn btn'><span>Projector</span><i className="fa fa-desktop"></i></button></a>
                    <button id='timerToggle' className='tool-btn btn'><span>Timer</span><i className="fa fa-clock-o"></i></button>
                  </div>
                </div>

                <div className='row tools-row '>
                  <button id='questionToggle' className='tool-btn btn'><span>Question</span><i className="fa fa-question-circle-o"></i></button>
                  <button id='thumbsToggle' className='tool-btn btn'><span>Thumbs</span><i className="fa fa-thumbs-up"></i></button>
                </div>

                <div className='row tools-row '>
                  <button id='pulseToggle' className='tool-btn btn'><span>Pulse</span><i className="fa fa-line-chart"></i></button>
                  <button id='feedbackToggle' className='tool-btn btn'><span>Feedback</span><i className="fa fa-exclamation"></i></button>
                </div>

                <div className='row tools-row '>
                  <Link to={`/summary/TUTORI`}>
                    <button id='stopPresentation' className='btn btn-red' >
                      <i className="fa fa-times"></i> Stop Presentation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(state => state)(PresenterView);
