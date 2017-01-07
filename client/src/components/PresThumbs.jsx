import React, { Component } from 'react';
import { connect } from 'react-redux';

// PresThumbs renders information supplied by the AudThumbs component.
  // This allows the presenter to see how many people are on board with a given question.

//  TODO:  Write functions to emit and receive data.
  // Find graphics.
  
class PresThumbs extends Component {
  

  render () {
    return (
      <div>
        <h1> Topic: </h1>
        <form>
          <input type='text' name="topic" /><br/>
       </form>
       <button onClick={ console.log('Write a function for me!') }>Set Topic</button>
        <div>
        <div>Thumbs up! {this.props.thumbs.up}</div><div>Thumbs to the side! {this.props.thumbs.down}</div><div>Thumbs Down! {this.props.thumbs.side}</div>
        </div>
        <h1>  Images go Here!</h1>
      </div>
    );
  };

};

const mapStateToProps = (state) => {
  return {
    thumbs: state.thumbs
  };
};

export default connect(mapStateToProps)(PresThumbs);
