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
      <div className='summary-info-box'>
        {
          this.props.thumbs
          ? <div><p>{this.props.title}</p>
            {Object.keys(this.props.thumbs).map((thumb, i) =>
                <p key={i}>{thumb}<span>: {this.props.thumbs[thumb]}</span></p>
              )
            }
          </div>

          : <div>
            <p><strong>{this.props.title}</strong><span>: {this.props.value || 0}</span></p>
          </div>
        }
        {
          !this.props.viewDetails || !this.props.viewDetails.length ? null
          : <button type="button" className='btn btn-default' onClick={() => { this.toggleView(true); }}>View</button>
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
