import React, { Component } from 'react';
import NewPresButton from './NewPresButton';
import Searchbar from './Searchbar';
import JoinPresBox from './JoinPresBox';
import DashMainContent from './DashMainContent';
import { Link } from 'react-router';
import Navbar from './Navbar';

// view that every user sees after logging in
// Contains
 // Navbar
 // NewPreButton
 // Searchbar
 // JoinPresBox
 // DashMainContent
class DashboardView extends Component {

  render () {
    return (
      <div>
        <Navbar/>
        <div className='container dash-board'>
          <div className='row'>
            <div className='main-dash col-md-9 col-md-9'>
              <DashMainContent/>
            </div>
            <div className='side-main-view col-md-3 col-lg-3'>
              <NewPresButton/>
              <Link to={'/summary/cc0001'}>Summary</Link>
              <Searchbar/>
              <JoinPresBox/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default DashboardView;
