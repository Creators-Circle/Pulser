/*    App structure
                                            +-------+
                                            |  App  |
                                            +---+---+
                                                |
        +------------------------------+--------+--------------------+-------------------------------------+--------------------------------+
        |                              |                             |                                     |                                |
+-------+-----------------+  +---------+-----------+  +--------------+---------------+  +------------------+--------------------+  +--------+--------+
|    DashboardView        |  |     AudienceView    |  |    PresenterViewContainer    |  |           SummaryView                 |  |    GuestView    |
+-------------------------+  +---------------------+  +------------------------------+  +---------------------------------------+  +-----------------+
|                         |  |                     |  |                              |  |                                       |  |                 |
| +---------------------+ |  | +-----------------+ |  | +--------------------------+ |  | +-----------------------+             |  |  +JoinPresBox   |
| |        NavBar       | |  | |     NavBar      | |  | |    PresenterView         | |  | |         NavBar        |             |  |                 |
| +---------------------+ |  | +-----------------+ |  | +--------------------------+ |  | +-----------------------+             |  |  +LogoutButton  |
| |    +LogoutButton    | |  | |  +LogoutButton  | |  | |                          | |  | |                       |             |  |                 |
| |                     | |  | |                 | |  | | +----------------------+ | |  | | +-------------------+ |             |  +-----------------+
| |    +UserInfo        | |  | |  +UserInfo      | |  | | |        NavBar        | | |  | | | TotalClicksTable  | |             |
| |                     | |  | |                 | |  | | +----------------------+ | |  | | +-------------------+ |             |
| +---------------------+ |  | +-----------------+ |  | | |     +LogoutButton    | | |  | | |  +TotalClicksRow  | |             |
|                         |  |                     |  | | |                      | | |  | | |                   | |             |
|     +NewPresButton      |  |    +Slides          |  | | |     +UserInfo        | | |  | | +-------------------+ |             |
|                         |  |                     |  | | |                      | | |  | |                       |             |
|     +Link               |  | +-----------------+ |  | | +----------------------+ | |  | +-----------------------+             |
|                         |  | |  FeedbackBox    | |  | |                          | |  |                                       |
|     +SearchBar          |  | +-----------------+ |  | | +----------------------+ | |  | +-----------------------+             |
|                         |  | | +FeedbackButton | |  | | |       PulseBox       | | |  | |    SummaryLeftPane    |             |
|     +JoinPresBox        |  | |                 | |  | | +----------------------+ | |  | +-----------------------+             |
|                         |  | |  +AudThumbs     | |  | | |      +LineChart      | | |  | |                       |             |
| +---------------------+ |  | |                 | |  | | |                      | | |  | | +-------------------+ |             |
| |   DashMainContent   | |  | | +-------------+ | |  | | +----------------------+ | |  | | |  TotalClicksTable | |             |
| +---------------------+ |  | | | QuestionBox | | |  | |                          | |  | | +-------------------+ |             |
| |                     | |  | | +-------------+ | |  | |        +PresThumbs       | |  | | |  +TotalClicksRow  | |             |
| | +-----------------+ | |  | | |  +Question  | | |  | |                          | |  | | |                   | |             |
| | |   PresPre^iews  | | |  | | |             | | |  | | +----------------------+ | |  | | +-------------------+ |             |
| | +-----------------+ | |  | | +-------------+ | |  | | |        SideBar       | | |  | |                       |             |
| | | +PresThumbNail  | | |  | |                 | |  | | +----------------------+ | |  | +-----------------------+             |
| | |                 | | |  | +-----------------+ |  | | |      +TitleBar       | | |  |                                       |
| | +-----------------+ | |  |                     |  | | |                      | | |  | +-----------------------------------+ |
| |                     | |  +---------------------+  | | +----------------------+ | |  | |         SummaryRightPane          | |
| |  ........OR.......  | |                           | |                          | |  | +-----------------------------------+ |
| |                     | |                           | +--------------------------+ |  | |                                   | |
| | +-----------------+ | |                           |                              |  | | +-------------------------------+ | |
| | |  SearchResults  | | |                           +------------------------------+  | | |       SummaryMainePane        | | |
| | +-----------------+ | |                                                             | | +-------------------------------+ | |
| | |  +PresThumbNail | | |                                                             | | |                               | | |
| | |                 | | |                                                             | | | +---------------------------+ | | |
| | +-----------------+ | |                                                             | | | |      SummaryInfoBox       | | | |
| |                     | |                                                             | | | +---------------------------+ | | |
| +---------------------+ |                                                             | | | |                           | | | |
|                         |                                                             | | | | +-----------------------+ | | | |
+-------------------------+                                                             | | | | | SummaryInfoBoxDetails | | | | |
                                                                                        | | | | +-----------------------+ | | | |
                                                                                        | | | | | +SummaryInfoBoxDetail | | | | |
                                                                                        | | | | |                       | | | | |
                                                                                        | | | | +-----------------------+ | | | |
                                                                                        | | | |                           | | | |
                                                                                        | | | +---------------------------+ | | |
                                                                                        | | |                               | | |
                                                                                        | | +-------------------------------+ | |
                                                                                        | |                                   | |
                                                                                        | |         +SummaryComment           | |
                                                                                        | |                                   | |
                                                                                        | +-----------------------------------+ |
                                                                                        |                                       |
                                                                                        +---------------------------------------+
Courtesy of http://asciiflow.com/
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardView from './DashboardView';
import GuestView from './GuestView';

import getUserData from '../util/getUserData';
import { StoreUser } from '../util/actions';

import '../css/Button.css';
import '../css/Auth.css';
import '../css/body.css';

// Primary App component.
class App extends Component {
  componentWillMount () {
    // store user data when App loads.
    getUserData((user) => {
      this.props.storeUser(user.name, user.email, user.avatar, user.id);
    });
  }

  render () {
    if (this.props.user.name === 'guest') {
      return (
        <GuestView/>
      );
    } else {
      return (
        <DashboardView/>
      );
    }
  };
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (name, email, avatar, id) => {
      dispatch(StoreUser(name, email, avatar, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
