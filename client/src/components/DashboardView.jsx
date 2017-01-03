import React, { Component } from 'react';
import NewPresButton from './NewPresButton';
import Searchbar from './Searchbar';
import LogoutButton from './LogoutButton';
import UserInfo from './UserInfo';
import JoinPresBox from './JoinPresBox';
import DashMainContent from './DashMainContent';

class DashboardView extends Component {

  render () {
    
      return (
        <div>
          <LogoutButton/>
          <div>
            <NewPresButton/>
            <Searchbar/>
            <UserInfo/>
          </div>
          <DashMainContent/>
          <JoinPresBox/>
        </div>
      );

  };
};

export default DashboardView;