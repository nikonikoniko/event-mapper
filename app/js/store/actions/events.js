import {
  isEqual, isEmpty, curry
} from 'lodash/fp';

import {store} from './index';

import api from '../../api';

const action = curry((name, payload) => ({type: name, payload}));

const eventsLoading = action('EVENTS_LOADING');
const sendEvents = action('SEND_EVENTS');
const selectEvent = action('SELECT_EVENT');
const unsetEvent = action('UNSET_EVENT');

const updateEvents = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(sendEvents(r));
      dispatch(eventsLoading(false));
      return r;
    });

const retrieveEvent = id =>
  dispatch => {
    const current = store.getState().event;
    console.log(id);
    // only ping the api if the filters have changed.
    if (!isEqual(id, current.id) || isEmpty(current.meat)) {
      dispatch({
        type: 'REQUEST_INCIDENT',
        received: false,
      });

      return api.get(`events/${id}`)
        .then(r => {
          dispatch(selectEvent(r));
          dispatch({
            type: 'REQUEST_INCIDENT',
            received: true,
          });
          return r;
        });
    }
  };

export {
  updateEvents,
  unsetEvent,
  retrieveEvent,
};
