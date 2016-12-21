// Contains the elements for the Presenter, including:
  //  PulseBox

import PulseBox from './PulseBox';
import Slides from './Slides';

const PresenterView = () => {
  return (
    <div>
      <Slides id="presenterSlides" role="presenter"/>
      <PulseBox />
    </div>
  );
};

export default PresenterView;
