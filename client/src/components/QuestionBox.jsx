import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionBox extends Component {
// This component lets users enter questions; it also displays each individual question component
  constructor () {
    super();
    // REMOVE THE STATE WHEN THE QUESTION REDUCER IS READY AND REPLACE WITH INFORMATION FROM THE STORE
    this.state = {
      questions: [{questionId: 0, questionText: 'first question'}, {questionId: 1, questionText: 'second question'}, {questionId: 3, questionText: 'third question'}]
    };
  };

  sendQuestion () {
    console.log('clicked sendQuestion');
  }

  render () {
    // Assign an id to the main component div so that it can be targeted on toggle events
    return (
      <div id="QuestionBox">
        <input type="text"></input>
        <button id="submitQuestion" onClick={this.sendQuestion.bind(this)}>Submit</button>
        {this.state.questions.map(question =>
          <Question id={question.questionId} text={question.questionText}/>
        )}
      </div>
    );
  };
};

export default QuestionBox;
// get the questions out of the store by connecting to mapStateToProps
