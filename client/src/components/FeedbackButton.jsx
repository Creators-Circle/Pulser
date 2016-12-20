// this component is for firing an event to update the pulseData inside redux store
// needs to be inside FeedbackBox component
import { connect } from 'react-redux';
// import a helper function to compute the time difference
import timeDiffToMinutes from '../util/timeDiffToMinutes';

const FeedbackButton = () => {


  render() {
    return (
      <button id="updatePulse">Feedback</button>
    );
  }

  componentDidMount() {
    let canIncrement = true; // variable to toggle increment ability
    let resetCode; // variable to store setTimeout reset code

    document.getElementById('updatePulse').addEventListener("click", function(){
      // If button has not been clicked in last 30 seconds,
      // then fire "increment" event and queue "decrement" event
      if (canIncrement) {
        socket.emit('updatePulse', 'INCREMENT', new Date())
        decrement();
        canIncrement = false;
        // TODO: send click to DB with user info
      } else { // if button has been clicked in last 30 seconds, reset decrement event
        resetDecrement();
        // TODO: send click to DB with user info
      }
    });
    
    function decrement() {
      // In 30 seconds, emit "decrement" event
      // Capture reset code for setTimeout and store in resetCode
      resetCode = setTimeout( function () {
        socket.emit('updatePulse', "DECREMENT", new Date());
        canIncrement = true;
       }, 10000);
    }

    function resetDecrement () {
        clearTimeout(resetCode); //use clearTimeout to kill the other setTimeout
        decrement(); //fire another setTimeout instead.
    }
  }
}

export default FeedbackButton;
