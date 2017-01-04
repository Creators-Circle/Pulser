import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';
import { browserHistory } from 'react-router';

// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {

  joinPresentation () {
    let lectureId = $('#join').val();
    let socket = io(`/${lectureId}`);
    let dispatch = this.props.dispatch;
    
    dispatch({
      type: 'ASSIGN_LECTURE_ID',
      lectureId: lectureId,
      socket: socket
    });
      socket.on('presentationUrlResponse', function (presentationUrl) {
        dispatch({
          type: 'ASSIGN_LECTURE_ID',
          lectureId: lectureId,
          embedUrl: presentationUrl
        })
        browserHistory.push('/audience');
      })
      socket.emit('presentationUrlRequest');
  }

  render () {
    return (
      <div id='joinBox'>
        <input id='join' type='text' /><br/>
        <button onClick={this.joinPresentation.bind(this)}>Join a presentation</button>
      </div>
    );
  };
};

export default connect(state => state)(JoinPresBox);
