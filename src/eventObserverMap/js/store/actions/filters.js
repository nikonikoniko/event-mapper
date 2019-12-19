import {
  merge, curry,
} from 'lodash/fp';

import api from '../../api';

import {store} from '../index';

import {
  shouldUpdate
} from './helpers';

import {
  updateObservations, sendObservations, observationsLoading
} from './observations';
import {updateEvents} from './events';

const action = curry((name, payload) => ({type: name, payload}));

const sendFilters = action('UPDATE_FILTERS');

const updateFilters = filters =>
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

const resetFilters = () =>
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

export {
  resetFilters,
  updateFilters
};
