import React, { Component } from 'react';
import PresThumbnail from './PresThumbnail';
import getUserLectures from '../util/getUserLectures';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Panel that displays list of presentations
class PresPreviews extends Component {
// Currently loading multiple copies of PresThumbnail for testing.  Will refactor eventually with a forEach.
  constructor (props) {
    super();
  }
  componentWillMount () {
    // store all the lectures of a specific user in the store
    getUserLectures((lectures) => {
      this.props.dispatch({
        type: 'STORE_USER_LECTURES',
        lectures: lectures
      });
    });
  }

  render () {
    // filter the most recent lectures and filter depending on the role given
    let recentLectures = this.props.userLectures
      .filter(lecture => lecture.role === this.props.role).slice(0, 8);
    // only the presenter can view the summary of his lecture
    if (this.props.role === 'presenter') {
      return (
        <div>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
                <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                  <PresThumbnail date = {lecture.date} name = {lecture.name} />
                </Link>
              ) : <p>No recent activites</p>
          }
        </div>
      );
    } else {
      return (
        <div>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
                <a key={i} href={`https://docs.google.com/presentation/d/${lecture.presentation_id}/preview`} target='_blank'>
                  <PresThumbnail
                    key={i}
                    id = {lecture.id}
                    date = {lecture.date}
                    name = {lecture.name}
                  />
                </a>
              ) : <p>No recent activites</p>
          }
        </div>
      );
    }
  };
};

const mapStatetoProps = (state) => {
  return {
    userLectures: state.userLectures
  };
};
export default connect(mapStatetoProps)(PresPreviews) ;
