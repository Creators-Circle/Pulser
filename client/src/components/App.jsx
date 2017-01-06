/*    App structure

                                                    +-------+
                                                    |  App  |
                                                    +-------+
                                                        |
                +---------------------------------------------------------------------------------------------------+
                |                              |                    |                       |                       |
        +-------------------------+  +---------------------+  +-------------+  +--------------------------+   +-------------+
        |    DashboardView        |  |     AudienceView    |  |PresenterView|  |       SummaryView        |   |ProjectorView|
        +-------------------------+  +---------------------+  +-------------+  +--------------------------+   +-------------+
        | +NewPresButton          |  | +Slides             |  |  +Slides    |  |                          |   | +Slides     |
        |                         |  |                     |  |             |  | +----------------------+ |   |             |
        | +Searchbar              |  | +-----------------+ |  |  +PulseBox  |  | |   SummaryLeftPane    | |   +-------------+
        |                         |  | |   FeedbackBox   | |  |             |  | +----------------------+ |
        | +LogoutButton           |  | +-----------------+ |  |  +Sidebar   |  | |  +TotalClicksTable   | |
        |                         |  | | +FeedbackButton | |  |             |  | |                      | |
        | +UserInfo               |  | |                 | |  |  +Questions |  | |     .....OR.....     | |
        |                         |  | +-----------------+ |  |             |  | |                      | |
        | +JoinPresBox            |  +---------------------+  |  +Timer     |  | |  +UserClicksTimeline | |
        |                         |                           |             |  | +----------------------+ |
        | +---------------------+ |                           |  +TitleBar  |  |                          |
        | |   DashMainContent   | |                           +-------------+  | +----------------------+ |
        | +---------------------+ |                                            | |   SummaryMainPane    | |
        | |                     | |                                            | +----------------------+ |
        | | +-----------------+ | |                                            | |   +SummaryInfoBox    | |
        | | |  PresPreviews   | | |                                            | |        (many)        | |
        | | +-----------------+ | |                                            | +----------------------+ |
        | | |                 | | |                                            +--------------------------+
        | | | +RecentPresMenu | | |
        | | |                 | | |
        | | | +PresThumb      | | |
        | | |    (many)       | | |
        | | +-----------------+ | |
        | |                     | |
        | |   ......OR......    | |
        | |                     | |
        | |   +-------------+   | |
        | |   |SearchResults|   | |
        | |   +-------------+   | |
        | |   | +PresThumb  |   | |
        | |   |    (many)   |   | |
        | |   +-------------+   | |
        | |                     | |
        | +---------------------+ |
        +-------------------------+
*/
import React, { Component } from 'react';
import $ from 'jquery';
import DashboardView from './DashboardView';
import getUserData from '../util/getUserData';
import { connect } from 'react-redux';
import GuestView from './GuestView';

class App extends Component {
  componentWillMount () {
    // store user data when App loads.
    getUserData((user) => {
      this.props.dispatch({
        type: 'STORE_USER',
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        id: user.id
      });
    });
  }
  
  render () {
    console.log(this.props);
    if(this.props.user.name === 'guest'){
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
    return {dispatch:state.dispatch, user: state.user};
}
export default connect(mapStateToProps)(App);