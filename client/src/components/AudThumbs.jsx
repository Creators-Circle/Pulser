import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import $ from 'jquery';

// AudThumbs allows audience members to give feedback when the presenter enables to 'thumbs' poll component.
  // This allows the presenter to see how each audience member feels about a specific topic/question.

//  TODO:  Find graphics

class AudThumbs extends Component {

  componentDidMount () {
    $('#Thumbs').toggle();
    let socket = this.props.socket;
    let userId = this.props.userId;
    let topicId = this.props.topicId;
    let dispatch = this.props.dispatch;

    $('.thumbButton').click(function (e) {
      // get direction of thumb that was chosen
      let thumbChoice = $(this)[0].id;
      // emit choice to the server / presenter / database
      socket.emit('thumb clicked', topicId, userId, thumbChoice);
      // fade out component and set 'displayed' property to false in the store
      $('#Thumbs').fadeToggle('slow');
      dispatch({type: 'TOGGLE_THUMBS_BOX'});
    });
  }

  // chooseThumb () {
  //   console.log('this thumb button', this)
  //   this.props.socket.emit('click thumb', this.props.topicId, this.props.userId, this.props.thumbChoice)
  //   dispatch({type:'TOGGLE_THUMBS_BOX'});
  // }

  render () {
    return (
      <div id="Thumbs">
        <h1 id="thumbTopic"></h1>
        <button className='thumbButton' id='up'>Thumbs up!</button>
        <button className='thumbButton' id='side'>Thumbs to the side!</button>
        <button className='thumbButton' id='down'>Thumbs Down!</button>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    socket: state.activeLecture.socket,
    userId: state.user.id,
    topicId: state.thumbs.topicId,
    dispatch: state.dispatch
  };
};

export default connect(mapStateToProps)(AudThumbs);
