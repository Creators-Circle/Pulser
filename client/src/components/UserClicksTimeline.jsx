import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slides from './Slides';
import { Link } from 'react-router';
import getUserData from '../util/getUserData';
import $ from 'jquery';

// timeline component to display record of when a user clicked and how many times
class UserClicksTimeline extends Component {

  render () {
    // ALL NEEDS TO BE REFACTORED TO CREATE CLICK TIMELINE FOR SPECIFIC USER

    // // Render a table of users and their total clicks
    // for (var user in this.props.usersClicks) {
    //   $('#usersClicks').find('tr:gt(0)').remove();
    //   $('#usersClicks tr:last').after(`<tr><td><a class="user" data-user=${user.split(' ').join('_')}>${user}</a></td><td>${this.props.usersClicks[user].length}</td></tr>`);
    // }
    // // Pull out the usersClicks from the this context of React for use in jQuery
    // var usersClicks = this.props.usersClicks;
    // $('.user').on('click', function () {
    //   alert(usersClicks[$(this).data('user').split('_').join(' ')]);
    // });
    // return (
    //   <div>
    //     <Link to="/">Home</Link>
    //     <table id="usersClicks">
    //     <tbody>
    //       <tr>
    //         <th>User</th>
    //         <th>Clicks</th>
    //       </tr>
    //     </tbody>
    //     </table>
    //   </div>
    // );
  }
}

const mapStatetoProps = (state) => {
  return {
    usersClicks: state.usersClicks
  };
};

export default connect(mapStatetoProps)(UserClicksTimeline);
