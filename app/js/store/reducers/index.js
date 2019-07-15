import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  event,
  events
} from './events';

import {
  observation
} from './observations';

import {
  stats,
  filters
} from './filters';

const app = combineReducers({
  events,
  filters,
  observation,
  event,
  stats,
  router: routerReducer
});

export default app;
