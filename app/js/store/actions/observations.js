import {
  isEqual, isEmpty, curry,
} from 'lodash/fp';

import api from '../../api';

import {store} from '../index';

const action = curry((name, payload) => ({type: name, payload}));

const loading = action('OBSERVATIONS_LOADING');
const send = action('SEND_OBSERVATIONS');
const select = send('SELECT_OBSERVATION');

const unsetObservation =
  () => ({type: 'UNSET_UNIT'});

const updateObservations = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(send(r));
      dispatch(loading(false));
      return r;
    });

const selectObservation = observation =>
    dispatch => dispatch(select(observation));

const retrieveUnit = unitId =>
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
          dispatch(selectObservation(r));
          dispatch({
            type: 'REQUEST_UNIT',
            received: true,
          });
          return r;
        });
    }
  };

export {
  updateObservations,
  unsetObservation,
  selectObservation,
};
