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

class App extends Component {
  componentWillMount () {
    // store user data when App loads.
    // Note that by this point the user will have logged in.
    // Their user information comes from the auth
    getUserData((user) => {
      console.log(user);
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
    return (
      <DashboardView/>
    );
  };
};

const mapStateToProps = (state) => {
    return {dispatch:state.dispatch};
}
export default connect(mapStateToProps)(App);