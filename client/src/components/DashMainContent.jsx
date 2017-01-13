import React, { Component } from 'react';
import PresPreviews from './PresPreviews';
import SearchResults from './SearchResults';
import '../css/Dashboard.css';
import { connect } from 'react-redux';

// main content panel in the DashboardView
  // by default it renders Recently Presented Slideshows / Recently Viewed Presentations
  // if a specific presentation is searched for, the results will appear in this area
// Contains
 // PresPreviews
 // SearchResults
class DashMainContent extends Component {

  constructor () {
    super();
    this.state = {
      role: 'presenter'// state for changing the view of presPreview component
    };
  }

// Changes view based on role selected.
  changeView (view) {
    this.setState({role: view});
  }

  render () {
    // if the searchbar is empty display the default view, else display the results
    if (!this.props.search) {
      return (
        <div>
          <div id='recentMenu'>
            <div className='recent-menu-options'>
              <span className="recentlyPresentedContainer"><a href='#' className={this.state.role === 'presenter' ? 'highlight' : ''}
                id='recentlyPresented'
                onClick = { () => { this.changeView('presenter'); }
              }>Recently Presented</a></span>
              <span className="recentlyViewedContainer"><a href='#' className={this.state.role === 'audience' ? 'highlight' : ''}
                id='recentlyViewed' onClick = { () => { this.changeView('audience'); }
              }>Recently Viewed</a></span>
            </div>
            <PresPreviews role = {this.state.role} />
          </div>
        </div>
      );
    } else {
      return (
        <div className='search-results'>
          <h1>Search Results</h1>
          <hr/>
          <SearchResults search={this.props.search}/>
        </div>
      );
    }
  };
};

const mapStateToProps = (state) => {
  return {
    search: state.searchValue
  };
};

export default connect(mapStateToProps)(DashMainContent);
