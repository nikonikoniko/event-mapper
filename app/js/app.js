import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import history from './store/history';

import '../scss/main.scss';

import App from './containers/App';

import {store} from './store';

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route path="" component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('js-root')
);
