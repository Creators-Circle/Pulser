import React, { Component } from 'react';
import PresPreviews from './PresPreviews';
import SearchResults from './SearchResults';
import '../css/Dashboard.css';

// main content panel in the DashboardView
  // by default it renders Recently Presented Slideshows / Recently Viewed Presentations
  // if a specific presentation is searched for, the results will appear in this area
class DashMainContent extends Component {

  render () {
    let search = false; // temp variable to be replaced with state value
    if (!search) {
      return (
        <div>
          <div id='recentMenu'>
            <div id='recentlyPresented'>Recently Presented</div>
            <div id='recentlyViewed'>Recently Viewed</div>
            <PresPreviews />
          </div>
        </div>
      );
    } else {
      return (
        <SearchResults />
      );
    }
  };
};

export default DashMainContent;
