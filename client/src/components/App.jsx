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
import Slides from './Slides';
// Allows html-like link functionality.
import { Link } from 'react-router';
import $ from 'jquery';
import checkAudienceOnly from '../util/checkAudienceOnly';
import AudienceView from './AudienceView';
// Links route users to pulsebox and feedbackbox as appropriate.
class App extends Component {

  constructor () {
    super();
    this.state = {
      audienceOnly: false
    };
  }

  componentWillMount () {
    // Check whether there is a presenter already
    checkAudienceOnly((audienceOnlyObject) => {
      this.setState({audienceOnly: audienceOnlyObject.audienceOnly});
    });
  };

  componentDidMount () {
    // Alter the server that there is already a presenter
    $('#presenter').on('click', function () {
      socket.emit('audienceOnly');
    });
  }

  render () {
    if (this.state.audienceOnly === true) {
      return (
      <div>
        <AudienceView />
      </div>
      );
    } else {
      return (
        <div>
          <Link to='/presenter'><button id='presenterButton'>Presenter</button></Link>
          <Link to='/audience'><button id='audienceButton'>Audience</button></Link>
        </div>
      );
    }
  };
};

export default App;
