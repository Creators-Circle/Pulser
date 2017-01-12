import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';
import store from '../store.jsx';
// AudThumbs allows audience members to give feedback when the presenter enables to 'thumbs' poll component.
  // This allows the presenter to see how each audience member feels about a specific topic/question.

//  TODO:  Find graphics

class AudThumbs extends Component {

  componentDidMount () {
    let socket = this.props.socket;
    let userId = this.props.userId;
    let currentTopicId = store.getState().topicId;
    let thumbsDisplayed = store.getState().thumbs.displayed;
    console.log(thumbsDisplayed);
    // render Thumbs box for the given topic when event 'open thumbs' is fired
    socket.on('open thumbs', function (topicId, topic) {
      currentTopicId = topicId;
      $('#AudThumbTopic').text(topic); // set h1 to current topic
      $('#Thumbs').fadeIn('slow'); // fade in Thumbs feature
      thumbsDisplayed = true;
    });

    $('.thumbButton').click(function (e) {
      // get direction of thumb that was chosen
      let thumbChoice = $(this)[0].id;
      // emit choice to the server / presenter / database
      socket.emit('thumb clicked', currentTopicId, userId, thumbChoice);
      // fade out component and set 'displayed' property to false in the store
      $('#Thumbs').fadeOut(1);
      thumbsDisplayed = false;
    });

    // Trigger thumbs box to close if still open
    socket.on('close thumbs', function () {
      if (thumbsDisplayed) $('#Thumbs').fadeOut('fast');
      thumbsDisplayed = false;
    });
  };

  render () {
    let thumbDisplay = store.getState().thumbs.displayed ? 'block' : 'none';
    return (
      <div id="Thumbs" style={{display: thumbDisplay}}>
        <span className="sidebar-header"><h2>{store.getState().thumbs.topicName}</h2></span>
        <img src='./img/1-thumb.png' className='thumbButton' id='up'/>
        <img src='./img/2-thumb.png' className='thumbButton' id='side'/>
        <img src='./img/3-thumb.png' className='thumbButton' id='down'/>
        <hr/>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.activeLecture.socket,
    userId: state.user.id
  };
};

export default connect(mapStateToProps)(AudThumbs);
