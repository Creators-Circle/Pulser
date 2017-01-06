import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionBox extends Component {

  constructor () {
    super();
    this.state = {
      questions: [{questionId: 0, questionText: 'first question'}, {questionId: 1, questionText: 'second question'}, {questionId: 3, questionText: 'third question'}]
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