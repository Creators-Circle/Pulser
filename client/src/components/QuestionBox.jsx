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
  }

  render () {
    return (
      <div>
        <input type="text"></input>
        <button id="submitQuestion">Submit</button>
        {this.state.questions.map(question =>
          <Question id={question.questionId} text={question.questionText}/>
        )}
      </div>
    );
  };
};

export default QuestionBox;
