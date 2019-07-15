import {isEqual, isEmpty} from 'lodash/fp';

import {store} from './index';

import api from '../../api';


const eventsLoading = received => ({type: 'EVENTS_LOADING', received});
const sendEvents = units => ({type: 'SEND_EVENTS', units});


const updateEvents = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(sendEvents(r));
      dispatch(eventsLoading(false));
      return r;
    });


const selectEvent = event => ({type: 'SELECT_INCIDENT', event});
const unsetEvent = () => ({type: 'UNSET_INCIDENT'});

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
