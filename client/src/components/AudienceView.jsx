// Contains the elements for the Audience, including:
  //  FeedbackBox.jsx
    // Slides.jsx
    // FeedbackButton.jsx

import FeedbackBox from './FeedbackBox';
import Slides from './Slides';

const AudienceView = () => {
  return (
    <div>
      <Slides id="audienceSlides" class="slides" role="audience"/>
      <FeedbackBox />
    </div>
  );
};

export default AudienceView;
