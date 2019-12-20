import {merge, set} from 'lodash/fp';

import {params} from '../params';

const idField = 'id';

const defaultEvents = {
  updating: true,
  ds: [],
};

const defaultEvent = {
  updating: true,
  id: params.event || '',
  meat: {}
};


const events = (
  state = defaultEvents,
  {type, payload}
) => {
  console.log('received action', {type, payload});
  switch (type) {
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
      console.log('unsetting event!!!');
      return merge(
        defaultEvent,
        {id: ''}
      );
    default:
      return state;
  }
};

export {
  event,
  events
};
