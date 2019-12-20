import {
  isEqual, isEmpty, curry
} from 'lodash/fp';

import {store} from './index';

import api from '../../api';

const action = curry((name, payload) => ({type: name, payload}));

const selectEvent = action('SELECT_EVENT');

const unsetEvent = () => action('UNSET_EVENT', null);

const updateEvents = () =>
  dispatch => api.events.get()
    .then(r => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
      console.log(r);
      dispatch(action('SEND_EVENTS', r));
      dispatch(action('EVENTS_LOADING', false));
      return r;
    });

const retrieveEvent = id =>
  dispatch => {
    const current = store.getState().event;
    console.log(id);
    // only ping the api if the filters have changed.
    if (!isEqual(id, current.id) || isEmpty(current.meat)) {
      dispatch(action('REQUEST_INCIDENT', false));

      return api.events.get(`events/${id}`)
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
  selectEvent,
};
