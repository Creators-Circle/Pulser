import React, { Component } from 'react';
import { connect } from 'react-redux';
import getUserData from '../util/getUserData';

class UserInfo extends Component {

  constructor (props) {
    super();
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
  }

  render () {
    return (
      <div>
        <p>{this.props.user.name}</p>
        <img id='profilePic' src={this.props.user.avatar} />
      </div>
    );
  };
};

const mapStatetoProps = (state) => {
  return {
    user: state.user
  };
};

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific parts of the state that you want to import

export default connect(mapStatetoProps)(UserInfo);
