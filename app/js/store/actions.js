// import Promise from 'bluebird';
import {merge, isEqual, isEmpty} from 'lodash/fp';

import {store} from './index';

import api from '../api';

const observationsLoading = received => ({type: 'OBSERVATIONS_LOADING', received});
const sendObservations = units => ({type: 'SEND_OBSERVATIONS', units});

const eventsLoading = received => ({type: 'EVENTS_LOADING', received});
const sendEvents = units => ({type: 'SEND_EVENTS', units});

const sendFilters = filters => ({type: 'UPDATE_FILTERS', filters});

const shouldUpdate = newFilters => {
  const {
    filters, events
  } = store.getState();
  return (
    !isEqual(newFilters, filters)
    || isEmpty(events.ds)
  );
}

const updateEvents = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(sendEvents(r));
      dispatch(eventsLoading(false));
      return r;
    });

const updateObservations = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(sendObservations(r));
      dispatch(observationsLoading(false));
      return r;
    });

export const updateFilters = filters =>
  dispatch => {
    const current = store.getState();
    const fs = merge(current.filters, filters);
    // only ping the api if the filters have changed.
    if (shouldUpdate(filters)) {
      dispatch(sendFilters(fs));
      dispatch(updateObservations(fs));
      dispatch(updateEvents(fs));
      // callApi('units', fs, dispatch, observationsLoading, sendObservations);
    }
  };

export const resetFilters = () =>
  dispatch => api.post({})
    .then(r => {
      dispatch(sendObservations(r));
      // dispatch(updateStats(r.stats));
      dispatch(observationsLoading(false));
      dispatch({
        type: 'RESET_FILTERS',
      });
      return r;
    });

export const selectUnit = unit => ({type: 'SELECT_UNIT', unit});
export const unsetUnit = () => ({type: 'UNSET_UNIT'});

export const selectEvent = event => ({type: 'SELECT_INCIDENT', event});
export const unsetEvent = () => ({type: 'UNSET_INCIDENT'});

export const retrieveEvent = id =>
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

export const retrieveUnit = unitId =>
  dispatch => {
    const current = store.getState().unit;
    // only ping the api if the filters have changed.
    if (!isEqual(unitId, current.id) || isEmpty(current.meat)) {
      dispatch({
        type: 'REQUEST_UNIT',
        received: false,
      });

      return api.get(`units/${unitId}`)
        .then(r => {
          console.log(r);
          dispatch(selectUnit(r));
          dispatch({
            type: 'REQUEST_UNIT',
            received: true,
          });
          return r;
        });
    }
  };


export default {
  updateFilters, resetFilters, retrieveUnit, unsetUnit, selectUnit
};
