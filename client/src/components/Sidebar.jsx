import FeedbackBox from './FeedbackBox';
import { Link } from 'react-router';

const Sidebar = () => {
  return (
    <div>
      <button>X</button>
      <button>Projector</button>
      <button>Timer</button>
      <button>Question</button>
      <button>Pulse</button>
      <button>Summary</button>
      <Link id="stopPresentation" to="/summary"><button>Stop Presentation</button></Link>
    </div>
  );
};

export default Sidebar;
