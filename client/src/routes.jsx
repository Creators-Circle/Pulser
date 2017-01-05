// file for creating routes for specific components
import { Route, browserHistory } from 'react-router';
import App from './components/App.jsx';
import PresenterView from './components/PresenterView';
import AudienceView from './components/AudienceView';
import SummaryView from './components/SummaryView';

const routes = (
  <Route>
    <Route path="/" component={App} />
    <Route path="/presenter" component={PresenterView} />
    <Route path="/audience" components={AudienceView} />
    <Route path="/summary" components={SummaryView} />
  </Route>
);

export default routes;
