import { connect } from 'react-redux';
import React, { Component } from 'react';

// button for firing an event to update the pulseData inside redux store
class FeedbackButton extends Component {

  render () {
    // console.log('props in FeedbackButton: ', this.props);
    return (
      <button id="updatePulse">Feedback</button>
    );
  }

  // TODO: Move setTimeout reset functionality to back-end
  componentDidMount () {
    // console.log('this.props in FeedbackButton: ', this.props);
    let canIncrement = true;
    let resetCode;
    let socket = this.props.activeLecture.socket;
    document.getElementById('updatePulse').addEventListener('click', () => {
      // If button has not been clicked in last 30 seconds,
      // then fire "increment" event and queue "decrement" event
      socket.emit('userClick', 'ADDCLICKTOUSER', new Date(), this.props.user.name);
      if (canIncrement) {
        socket.emit('updatePulse', 'INCREMENT', new Date());
        decrement();
        canIncrement = false;
      } else {
        resetDecrement();
      }
    });

    let decrement = () => {
      // In '30' seconds, emit "decrement" event
      // Capture reset code for setTimeout and store in resetCode
      // bind the this context
      resetCode = setTimeout(function () {
        socket.emit('updatePulse', 'DECREMENT', new Date());
        canIncrement = true;
      }, 5000);
    };

    let resetDecrement = () => {
      clearTimeout(resetCode); // use clearTimeout to kill the other setTimeout
      decrement(); // fire another setTimeout instead.
    };
  }
}

const mapStatetoProps = state => {
  return {user: state.user, activeLecture: state.activeLecture};
};

export default connect(mapStatetoProps)(FeedbackButton);
