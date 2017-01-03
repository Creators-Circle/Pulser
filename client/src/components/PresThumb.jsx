import React, { Component } from 'react';

// These are thumbnails of previous presentations w/ a title and date it was presented/viewed
class PresThumb extends Component {

  render () {
    return (
      <div className='slideThumb'>
        <img src='http://png.clipart.me/graphics/thumbs/103/presentation-template-with-six-colored-text-box_103671569.jpg' />
        <span><strong>Title</strong></span><br/>
        <span>Sept 23, 5:02 PM</span>
      </div>
    );
  };
};

export default PresThumb;
