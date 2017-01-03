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
import { connect } from 'react-redux';
import Slides from './Slides';
// Allows html-like link functionality.
import { Link } from 'react-router';
import getUserData from '../util/getUserData';
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
    // store user data when App loads.
    // Note that by this point the user will have logged in.
    // Their user information comes from the auth
    getUserData((user) => {
      this.props.dispatch({
        type: 'STORE_USER',
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    });
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
          <img id='profilePic' src={this.props.user.avatar} />
          <p>Hello {this.props.user.name}!</p>

          <Link to='/presenter'><button id='presenterButton'>Presenter</button></Link>
          <Link to='/audience'><button id='audienceButton'>Audience</button></Link>
        </div>
      );
    }
  };
};

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific parts of the state that you want to import
const mapStatetoProps = (state) => {
  return {
    pulseData: state.pulseData,
    user: state.user
  };
};

export default connect(mapStatetoProps)(App);
