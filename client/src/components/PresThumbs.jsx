import React, { Component } from 'react';
import { connect } from 'react-redux';

// PresThumbs renders information supplied by the AudThumbs component.
  // This allows the presenter to see how many people are on board with a given question.

//  TODO:  Write functions to emit and receive data.
  // Refactor to use Store
  // Find graphics.
class PresThumbs extends Component {
  constructor () {
    super();
      // Setting up thumbs variables here so they can be passed and rendered later.
      // Remove from state when necessary.
    this.thumbsUpTotal = 0;
    this.thumbsDownTotal = 1;
    this.thumbsSideTotal = 2;
  }

  render () {
    return (
      <div>
        <h1> Topic: </h1>
        <form>
          <input type='text' name="topic" /><br/>
       </form>
       <button onClick={ console.log('Write a function for me!') }>Set Topic</button>
        <div>
        <div>Thumbs up! {this.thumbsUpTotal}</div><div>Thumbs to the side! {this.thumbsSideTotal}</div><div>Thumbs Down! {this.thumbsDownTotal}</div>
        </div>
        <h1>  Images go Here!</h1>
      </div>
    );
  };

};

export default connect(state => state)(PresThumbs);
