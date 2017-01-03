import React, { Component } from 'react';
import PresThumb from './PresThumb';

// Panel that displays list of presentations
class PresPreviews extends Component {
// Currently loading multiple copies of PresThumb for testing.  Will refactor eventually with a forEach.
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
