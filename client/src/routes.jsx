// file for creating routes for specific components
import { Route, browserHistory, Redirect } from 'react-router';
import App from './components/App.jsx';
import PresenterView from './components/PresenterView';
import AudienceView from './components/AudienceView';
import SummaryView from './components/SummaryView';
import GuestView from './components/GuestView';
import PresenterViewContainer from './components/PresenterViewContainer';

const routes = (
  <Route>
    <Route path='/' component={App} />
    <Route path='/presenter' component={PresenterViewContainer} />
    <Route path='/summary/:lectureId' component={SummaryView} />
    <Route path='/audience' component={AudienceView} />
    <Route path='/guest' component={GuestView} />
  </Route>
);

export default routes;
