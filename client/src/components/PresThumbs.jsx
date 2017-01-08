import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidV1 from 'uuid/v1';

// PresThumbs requests feedback from audience members and renders the results of that data.
  // Audience members are prompted for feedback with the AudThumbs component.

//  TODO:  Find graphics

class PresThumbs extends Component {

  submitTopic () {
    let socket = this.props.socket;
    let topicId = uuid.v1();
    let topic = $('#topic').val();
    let lectureId = this.props.lectureId;
    socket.emit('submit thumbTopic', topicId, topic, lectureId);
  }

  render () {
    return (
      <div>
        <h1> Topic: </h1>
        <form>
          <input id="topic" type='text' name="topic" /><br/>
        </form>
        <button onClick={this.submitTopic}>Set Topic</button>
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
    lectureId: state.activeLecture.lectureId,
  };
};

export default connect(mapStateToProps)(PresThumbs);
