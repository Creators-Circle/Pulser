import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionBox extends Component {
// This component lets users enter questions; it also displays each individual question component
  constructor () {
    super();
    this.state = {
      questions: [{questionId: 0, questionText: 'first question'}, {questionId: 1, questionText: 'second question'}, {questionId: 3, questionText: 'third question'}]
    // this is hardcoded - we will need to refactor to use store later
    };
  };

  sendQuestion () {
    // Get lectureId from input box above join button
    let lectureId = $('#join').val();

    // Subscribe to custom namespace based on lectureId
    let socket = io(`/${lectureId}`);

    // Preserve the context of "this"
    let dispatch = this.props.dispatch;
    let userId = this.props.user.id;
    // Listen for presentation URL response from presenter
    socket.on('create question', function (questionId, questionText, lectureId, userId) {
      // Update store with presentation data and store socket reference
      dispatch({
        type: 'ASSIGN_LECTURE_ID',
        lectureId: lectureId,
        embedUrl: presentationUrl,
        socket: socket,
        name: presentationName,
        presentationId: presentationId
      });
      let lecture = {
        id: lectureId,
        name: presentationName,
        presentationId: presentationId,
        userId: userId,
        role: 'audience'
      };
      socket.emit('userLecture', lecture);

    });

    // Emit request to server (and then to presenter) for presention URL
    socket.emit('presentationInfoRequest');
  }

  render () {
    // Assign an id to the main component div so that it can be targeted on toggle events
    return (
      <div id="QuestionBox">
        <input type="text"></input>
        <button id="submitQuestion"onClick={this.sendQuestion.bin(this)}>Submit</button>
        {this.state.questions.map(question =>
          <Question id={question.questionId} text={question.questionText}/>
        )}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeLecture: state.activeLecture
  };
};

export default connect(mapStateToProps)(QuestionBox);
//this.props.socket