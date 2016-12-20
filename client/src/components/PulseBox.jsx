// this component is for displaying the live visualization of users' feedback
import { connect } from 'react-redux';

// pass the pulseData coming from redux store
const PulseBox = ({pulseData}) => {
  return (
    <div>
      <p>Pulse Box</p>
      {pulseData}
    </div>
  )
}

// get the pulseData from redux store
const mapStatetoProps = (state) => {
  return {pulseData: state.pulseData}
}
export default connect(mapStatetoProps)(PulseBox)
