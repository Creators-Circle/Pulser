import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import store from './store.jsx';
import App from './components/App.jsx';

const render = () => {
  ReactDOM.render(
    // pass redux store as a prop inside Provider to make it available to all components
    <Provider store = {store}>
      <Router>
        <Route path="/" component={App} />
        {/* {fill in with other components that needs a specific route} */}
      </Router>
    </Provider>
  ,document.getElementById('app'));
};

store.subscribe(render);
render();
