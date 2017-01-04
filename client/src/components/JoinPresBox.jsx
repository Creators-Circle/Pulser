import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';
import { browserHistory } from 'react-router';

// takes a unique id as input and renders AudienceView for specific presentation
class JoinPresBox extends Component {

  joinPresentation () {
    let lectureId = $('#join').val();
    console.log('this', this);
    let socket = io(`/${lectureId}`);
    this.props.dispatch({
      type: 'ASSIGN_LECTURE_ID',
      lectureId: lectureId,
      socket: socket
    });
    // socket.emit('requestPresentation');
    // socket.on(this.props.user.name, function (data) {
    //   this.props.dispatch({
    //     type: 'ASSIGN_LECTURE_ID',
    //     lectureId: lectureId,
    //     presentationId: data
    //   })
    // })
    console.log('presentation joined');
    browserHistory.push('/audience');
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
