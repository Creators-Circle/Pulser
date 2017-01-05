import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// table to display total number of clicks per user during the presentation
class TotalClicksTable extends Component {

  displayUserSummary (id) {
    // test for clicking the user's name or picture, replace with userSummary component
    console.log('display user');
  }

  render () {
    // pull out the users from the store and filter by audience
    let usersClicks = this.props.summary.users.filter(user => user.role === 'audience');
    return (
      <div>
        <Link to="/">Home</Link>
        <table id="usersClicks">
        <tbody>
          <tr>
            <th>User</th>
            <th>Clicks</th>
          </tr>
          {
            usersClicks.map(user =>
            <tr>
              <td onClick = { () => { this.displayUserSummary(user.user_id); } }>
                <img id='profilePic' src={user.avatar} /><span>{user.name}</span>
              </td>
              <td>{user.no_of_clicks}</td>
            </tr>
            )
          }
        </tbody>
        </table>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    summary: state.summary
  };
};

export default connect(mapStatetoProps)(TotalClicksTable);
