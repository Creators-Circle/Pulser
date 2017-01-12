// component for displaying the a list of data about the Summary Info box
import React, { Component } from 'react';
import SummaryInfoBoxDetail from './SummaryInfoBoxDetail.jsx';

class SummaryInfoBoxDetails extends Component {
  render () {
    return (
      <div className='summary-info-box-details-container'>
        <div className='summary-info-box-details'>
          <h1>{this.props.title}</h1>
          <ul>
          {
            this.props.details.map(detail =>
              <SummaryInfoBoxDetail key={Math.random()} detail={detail} />
            )
          }
          </ul>
          <button className='btn btn-green close-btn'
                  onClick={() => { this.props.toggleView(false); }}
          ><i className="fa fa-close"></i> Close</button>
        </div>
      </div>
    );
  }
};

export default SummaryInfoBoxDetails;
