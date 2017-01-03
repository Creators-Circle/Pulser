import React, { Component } from 'react';
import PresThumb from './PresThumb';

// panel to display search results from querying DB for specific presentation data
class SearchResults extends Component {

  render () {
    return (
      <div>
        <PresThumb />
        <PresThumb />
        <PresThumb />
        <PresThumb />
      </div>
    );
  };
};

export default SearchResults;
