import React, { Component } from 'react';
import PresThumb from './PresThumb';

// Panel that displays list of presentations
class PresPreviews extends Component {

  render () {
    return (
      <div>
        <PresThumb />
        <PresThumb />
        <PresThumb />
        <PresThumb />
        <PresThumb />
        <PresThumb />
      </div>
    );
  };
};

export default PresPreviews;
