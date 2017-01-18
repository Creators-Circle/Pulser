import React, { Component } from 'react';
import PresThumbnail from './PresThumbnail';
import getUserLectures from '../util/getUserLectures';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
        <div className='recent-lectures'>
          <ul>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
              <li className='slideThumb'>
                <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                  <PresThumbnail date = {lecture.date} name = {lecture.name} />
                </Link>
              </li>
              ) : <p>No recent activites</p>
          }
          </ul>
        </div>
      );
    } else {
      return (
        <div className='recent-lectures'>
          <ul>
          {
            recentLectures.length > 0
              ? recentLectures.map((lecture, i) =>
                <li className='slideThumb'>
                  <a key={i} href={`https://docs.google.com/presentation/d/${lecture.presentation_id}/preview`} target='_blank'>
                    <PresThumbnail
                      key={i}
                      id = {lecture.id}
                      date = {lecture.date}
                      name = {lecture.name}
                      viewed = {true}
                    />
                  </a>
                </li>
              ) : <p>No recent activites</p>
          }
          </ul>
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
