// contains the buttons that an audience can use to interact with the presenter

import FeedbackButton from './FeedbackButton';

const FeedbackBox = () => {
  // console.log('props in FeedbackBox: ', props)
  return (
    <FeedbackButton socket={props.socket}/>
  );
};

export default FeedbackBox;
