import { Component } from 'react'
import { connect } from 'react-redux'

import FeedbackBox from './FeedbackBox'
import PulseBox from './PulseBox'

class App extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <p>Hello World!</p>
        {/* {if role === console presen display feedback component} */}
        <PulseBox />
        {/* {if role === audience display feedback component} */}
        <FeedbackBox />
      </div>
    )
  }
}

// connect(state => state) is a bad practice because it will rerender after every action
// mapStatetoProps lets you specify specific state you want to import
const mapStatetoProps = (state) => {
  // return pulseData coming from redux store
  return {pulseData: state.pulseData}
}

export default connect(mapStatetoProps)(App)
