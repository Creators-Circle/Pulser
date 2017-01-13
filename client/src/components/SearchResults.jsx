import React, { Component } from 'react';
import PresThumbnail from './PresThumbnail';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// panel to display search results from querying DB for specific presentation data
  // Rendered by loginDashboard.
// Contains
 // PresThumbnail
class SearchResults extends Component {

  render () {
    let search = this.props.search.toLowerCase();
    // filter the lectures by user input
    let searchLectures = this.props.userLectures.filter(lecture =>
      lecture.name.toLowerCase().includes(search)
    );
    return (
      <div>
        <ul>
        { searchLectures.length === 0 ? <p className ='no-results'>No results found</p>
          : searchLectures.map((lecture, i) =>
          // restrict click functionality for viewed lectures
            <li className='slideThumb'>
            {
              lecture.role === 'audience'
              ? <PresThumbnail key = {lecture.id} viewed={true} date = {lecture.date} name = {lecture.name} />
              : <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                  <PresThumbnail date = {lecture.date} name = {lecture.name} />
                </Link>
            }
            </li>
        )}
        </ul>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userLectures: state.userLectures,
    search: state.searchValue
  };
};

export default connect(mapStateToProps)(SearchResults);
