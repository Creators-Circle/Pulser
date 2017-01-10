import React, { Component } from 'react';
import moment from 'moment';
import timeDiffToMinutes from '../util/timeDiffToMinutes.js';

// These are thumbnails of previous presentations w/ a title and date it was presented/viewed
class PresThumbnail extends Component {

  render () {
    let currDate = new Date();
    let lectureDate = new Date(this.props.date);
    // if the lecture's date is more than 7 days ago, format like 'Sun, Jan 1 2017 8:52 AM' else 'Today at 2:00pm'
    let formatDate = Math.abs(timeDiffToMinutes(currDate, lectureDate)) > 10080
      ? moment(lectureDate).format('llll') : moment(lectureDate).calendar();
    return (
      <div className='slideThumb'>
        <img src='http://png.clipart.me/graphics/thumbs/103/presentation-template-with-six-colored-text-box_103671569.jpg' />
        <span><strong>{this.props.name}</strong></span><br/>
        <span>{formatDate}</span>
      </div>
    );
  };
};

export default PresThumbnail;
