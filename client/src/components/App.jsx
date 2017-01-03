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
        |                         |                           +-------------+  | +----------------------+ |
        | +---------------------+ |                                            |                          |
        | |   DashMainContent   | |                                            | +----------------------+ |
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


class App extends Component {
  render () {
    return (
      <DashboardView/>
    );
  };
};

export default App;
