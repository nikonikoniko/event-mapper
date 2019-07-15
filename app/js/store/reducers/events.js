import {merge, set} from 'lodash/fp';

import {params} from '../params';

const idField = 'id';

const defaultCollection = {
  updating: true,
  ds: [],
};

const events = (
  state = defaultCollection,
  {type, payload}
) => {
  console.log('received action', {type, payload});
  switch (type) {
    case 'INITIATE':
      return {};
    case 'SEND_EVENTS':
      return set('ds', payload, state);
    case 'EVENTS_LOADING':
      return merge(
        state,
        {updating: payload}
      );
    default:
      return state;
  }
};

const defaultEvent = {
  updating: true,
  id: params.event || '',
  meat: {}};

const event = (
  state = defaultEvent,
  {type, payload}
) => {
  console.log('received action', {type, payload});
  switch (type) {
    case 'SELECT_EVENT':
      return merge(state, {
        id: payload[idField],
        meat: payload
      });
    case 'UNSET_EVENT':
      return merge(
        defaultEvent,
        {id: ''}
      );
    case 'REQUEST_EVENT':
      return merge(
        state,
        {updating: payload}
      );
    default:
      return state;
  }
};

export {
  event,
  events
};
