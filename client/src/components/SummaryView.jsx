import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slides from './Slides';
import { Link } from 'react-router';
import getUserData from '../util/getUserData';
import $ from 'jquery';

class SummaryView extends Component {

  render () {
    console.log('props in SummaryView: ', this.props);
    // Render a table of users and their total clicks
    for (var user in this.props.usersClicks) {
      $('#usersClicks').find('tr:gt(0)').remove();
      $('#usersClicks tr:last').after(`<tr><td>${user}</td><td>${this.props.usersClicks[user].length}</td></tr>`);
    }
    return (
      <div>
        <Link to="/">Home</Link>
        <table id="usersClicks">
          <tr>
            <th>User</th>
            <th>Clicks</th>
          </tr>
        </table>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    usersClicks: state.usersClicks
  };
};

export default connect(mapStatetoProps)(SummaryView);
