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
            <div className='main-dash col-sm-9 col-md-9 col-md-9'>
              <DashMainContent/>
            </div>
            <div className='side-main-view col-sm-3 col-md-3 col-lg-3'>
              <Searchbar/>
              <NewPresButton/>
              <hr/>
              <JoinPresBox/>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default DashboardView;
