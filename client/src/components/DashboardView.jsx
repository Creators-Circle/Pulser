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
        <div>
          <NewPresButton/>
          <Link to={'/summary/cc0001'}>Summary</Link>
          <Searchbar/>
          <JoinPresBox/>
        </div>
        <DashMainContent/>
      </div>
    );
  };
};

export default DashboardView;
