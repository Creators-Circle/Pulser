// file for creating routes for specific components
import { Route, browserHistory, Redirect } from 'react-router';
import App from './components/App.jsx';
import PresenterView from './components/PresenterView';
import AudienceView from './components/AudienceView';
import SummaryView from './components/SummaryView';
import GuestView from './components/GuestView';

const routes = (
  <Route>
    <Route path='/' component={App} />
    <Route path='/presenter' component={PresenterView} />
    <Route path='/summary' component={SummaryView} />
    <Route path='/audience' component={AudienceView} />
    <Route path='/guest' component={GuestView} />
  </Route>
);

export default routes;
