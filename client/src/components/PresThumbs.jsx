import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import $ from 'jquery';

// PresThumbs requests feedback from audience members and renders the results of that data.
  // Audience members are prompted for feedback with the AudThumbs component.

//  TODO:  Find graphics

class PresThumbs extends Component {

  componentDidMount () {
    // hide thumbs component on load
    $('#Thumbs').toggle();

    // retain 'this' context
    let dispatch = this.props.dispatch;
    let render = this.forceUpdate.bind(this);

    // socket listener for when an audience member clicks on a thumb
    this.props.socket.on('thumb clicked', function (thumbChoice) {
      // increment the total tally in the store for the thumb chosen
      dispatch({type: 'THUMB_CLICKED', thumbChoice: thumbChoice});

      // TO DO: trigger re-render
      render();
      console.log('thumb clicked!');
    });
  }

  // function to submit a topic (as the presenter)
  // TO DO: re-render or hide the input box and submit button after submitting
      // user need sto know that it was successful and disable submit capability
  submitTopic () {
    let socket = this.props.socket;
    let topicId = uuid();
    let topic = $('#topic').val();
    let lectureId = this.props.lectureId;
    socket.emit('submit thumbTopic', topicId, topic, lectureId);
  }

  render () {
    return (
      <div id='Thumbs'>
        <h1> Topic: </h1>
        <form>
          <input id='topic' type='text' name='topic' /><br/>
        </form>
        <button onClick={this.submitTopic.bind(this)}>Set Topic</button>
        <div>
          <div>Thumbs up!<br/>{this.props.thumbs.up}</div>
          <div>Thumbs to the side!<br/>{this.props.thumbs.down}</div>
          <div>Thumbs Down!<br/>{this.props.thumbs.side}</div>
        </div>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    thumbs: state.thumbs,
    socket: state.activeLecture.socket,
    lectureId: state.activeLecture.lectureId
  };
};

export default connect(mapStateToProps)(PresThumbs);
