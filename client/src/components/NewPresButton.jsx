import React, { Component } from 'react';
import picker from '../util/googlePicker'; // import Google Picker function
import setLectureId from '../util/setLectureId';
import { connect } from 'react-redux';
import store from '../store.jsx';
// button to select Google Slides presentation from user's Google Drive to present
class NewPresButton extends Component {

  constructor () {
    super();
    store.subscribe(this.render);
  }
  // clickHandler () {
  //   let actionObj = Object.assign({}, picker());
  //  this.props.dispatch(actionObj);
  // }
  render () {
    console.log('this.props in NewPresButton', this.props);
    return (
    <div>
      <button onClick={picker}>New Presentation</button>
    </div>
    );
  };
};

const mapStatetoProps = state => {
  return {presentationsLectures: state.presentationsLectures};
};

export default connect(mapStatetoProps)(NewPresButton);
