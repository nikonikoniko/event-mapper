import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {merge, set} from 'lodash/fp';

import {params} from './params';

const stats = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const filters = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_FILTERS':
      return merge(state, {filters: action.filters});
    case 'RESET_FILTERS':
      return set('filters', {}, state);
    default:
      return state;
  }
};

const defaultCollection = {
  updating: true,
  ds: [],
};

const events = (state = defaultCollection, action) => {
  switch (action.type) {
    case 'INITIATE':
      return {};
    case 'SEND_EVENTS':
      return set('ds', action.units, state);
    case 'EVENTS_LOADING':
      return merge(state, {updating: action.received});
    default:
      return state;
  }
};

const defaultUnit = {
  updating: true,
  id: params.unit || '',
  meat: {}};

const unit = (state = defaultUnit, action) => {
  switch (action.type) {
    case 'SELECT_UNIT':
      return merge(state, {
        id: action.unit.reference_code,
        meat: action.unit
      });
    case 'UNSET_UNIT':
      return merge(defaultUnit, {id: ''});
    case 'REQUEST_UNIT':
      return merge(state, {updating: action.received});
    default:
      return state;
  }
};

const defaultEvent = {
  updating: true,
  id: params.event || '',
  meat: {}};

const event = (state = defaultEvent, action) => {
  switch (action.type) {
    case 'SELECT_INCIDENT':
      return merge(state, {
        id: action.event.event_code,
        meat: action.event
      });
    case 'UNSET_INCIDENT':
      return merge(defaultEvent, {id: ''});
    case 'REQUEST_INCIDENT':
      return merge(state, {updating: action.received});
    default:
      return state;
  }
};
const app = combineReducers({
  events,
  filters,
  unit,
  event,
  stats,
  router: routerReducer
});

export default app;
