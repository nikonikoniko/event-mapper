import React from 'react';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './js/containers/App';
import {store} from './js/store';
import history from './js/store/history';

import './scss/main.scss';

export default (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="" component={App} />
      </div>
    </Router>
  </Provider>
);
