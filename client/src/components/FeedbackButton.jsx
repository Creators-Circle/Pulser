// this component is for firing an event to update the pulseData inside redux store
// needs to be inside FeedbackBox component
import { connect } from 'react-redux';
// import a helper function to compute the time difference
import timeDiffToMinutes from '../util/timeDiffToMinutes';

const FeedbackButton = ({presentationStartTime, dispatch}) => {
  let startTime = presentationStartTime;
  let currTime,timeDifference;

  // this function is for calling a dispatch to increment the number the pulseData
  const onSubmit = () => {
    currTime = new Date();
    // compute the time difference and pass it with the action
    timeDifference = timeDiffToMinutes(startTime,currTime);
    dispatch({
      type: 'INCREMENT',
      time: timeDifference
    })
  }

  return (
    <button onClick={ ()=>{onSubmit()} }>Feedback</button>
  )
}
// get the start time of the presentation in the redux store
const mapStatetoProps = (state) => {
  return {presentationStartTime: state.presentationStartTime};
}

export default connect(mapStatetoProps, dispatch => {
  return {dispatch}
})(FeedbackButton)
