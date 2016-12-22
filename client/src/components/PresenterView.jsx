// Contains the elements for the Presenter, including:
  //  PulseBox

import PulseBox from './PulseBox';
import Slides from './Slides';

const PresenterView = () => {
  return (
    <div>
      <Slides id="presenterSlides" role="presenter"/>
      <iframe src="http://ipadstopwatch.com/embed.html" frameborder="0" scrolling="no" width="391" height="140"></iframe>
      <PulseBox />
    </div>
  );
};

export default PresenterView;
