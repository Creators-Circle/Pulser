import React, { Component } from 'react';
import SummaryInfoBoxDetails from './SummaryInfoBoxDetails';

// this component is meant to display different sets of data about each presentation
  // ex: avg clicks/minute, highest amount of clicks at one time, avg clicks per student, etc
class SummaryInfoBox extends Component {
  constructor () {
    super();
    this.state = {
      showDetails: false
    };
  }
  toggleView (toggle) {
    this.setState({showDetails: toggle});
  }

  render () {
    return (
      <div className='summaryInfoBox'>
        <img src='http://png.clipart.me/graphics/thumbs/103/presentation-template-with-six-colored-text-box_103671569.jpg' />
        <span><strong>{this.props.title}</strong></span>:
        <span>{this.props.value}</span>
        {
          !this.props.viewDetails ? null
          : <button onClick={() => { this.toggleView(true); }}>View</button>
        }
        {
          !this.state.showDetails ? null
          : <SummaryInfoBoxDetails details={this.props.viewDetails} toggleView={this.toggleView.bind(this)} />
        }
      </div>
    );
  };
};

export default SummaryInfoBox;
