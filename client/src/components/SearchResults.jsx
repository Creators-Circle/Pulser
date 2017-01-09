import React, { Component } from 'react';
import PresThumbnail from './PresThumbnail';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// panel to display search results from querying DB for specific presentation data
  // Rendered by loginDashboard.
class SearchResults extends Component {

  render () {
    let search = this.props.search;
    // filter the lectures by the input given by the user
    let searchLectures = this.props.userLectures.filter(lecture => lecture.name.includes(search));
    return (
      <div>
        { searchLectures.length === 0 ? <p>No results found</p>
          : searchLectures.map((lecture, i) =>
            lecture.role === 'audience'
            ? <PresThumbnail key = {lecture.id} date = {lecture.date} name = {lecture.name} />
            : <Link key={i} to={`/summary/${lecture.lecture_id}`}>
                <PresThumbnail date = {lecture.date} name = {lecture.name} />
              </Link>
        )}
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
