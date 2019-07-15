

import {merge, set} from 'lodash/fp';

import {params} from '../params';


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

export {
  event,
  events
};
