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
        <div className='thumbnails'>
          {
            this.props.viewed ? <i className="fa fa-desktop"></i>
              : <i className="fa fa-line-chart"></i>
          }
          <p>{formatDate}</p>
          <p className='recent-presentation-title'><strong>{this.props.name}</strong></p>
        </div>
    );
  };
};

export default PresThumbnail;
