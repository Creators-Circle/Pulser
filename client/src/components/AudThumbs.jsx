import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';
import store from '../store.jsx';

// AudThumbs allows audience members to indicate their feelings about a subject when the presenter desires.
// Contains
  // --
class AudThumbs extends Component {

  componentDidMount () {
    $('#Thumbs').toggle();
    let socket = this.props.socket;
    let userId = this.props.userId;
    // set currentTopicId from store, but it's not updating as expected
    // leaving it commented for now in case we use store later on.
    let currentTopicId; /* = this.props.topicId; */
    // let dispatch = this.props.dispatch;
    // We have redundant socket listeners here.
    // This is a patch until store is working
    socket.on('open thumbs', (topicId, topic) => currentTopicId = topicId);
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
        <span className="sidebar-header"><h2 id="AudThumbTopic">{store.getState().thumbs.topicName}</h2></span>
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
