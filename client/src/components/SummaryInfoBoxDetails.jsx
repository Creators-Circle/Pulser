import React, { Component } from 'react';
import SummaryInfoBoxDetail from './SummaryInfoBoxDetail.jsx';

class SummaryInfoBoxDetails extends Component {
  render () {
    return (
      <div className='summary-info-box-details'>
        <ul>
        {
          this.props.details.map(detail =>
            <SummaryInfoBoxDetail key={Math.random()} detail={detail} />
          )
        }
        </ul>
        <button onClick={() => { this.props.toggleView(false); }}>Close</button>
      </div>
    );
  }
};

export default SummaryInfoBoxDetails;
