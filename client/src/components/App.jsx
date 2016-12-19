import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return(
      <p>Hello World</p>
    )
  }
}

export default connect(state => state)(App);
