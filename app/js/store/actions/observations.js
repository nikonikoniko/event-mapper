import {
  isEqual, isEmpty
} from 'lodash/fp';

import api from '../../api';

import {store} from '../index';

const observationsLoading = received => ({type: 'OBSERVATIONS_LOADING', received});
const sendObservations = units => ({type: 'SEND_OBSERVATIONS', units});

export const selectUnit = unit => ({type: 'SELECT_UNIT', unit});
export const unsetUnit = () => ({type: 'UNSET_UNIT'});

const updateObservations = filters =>
  dispatch => api.post(filters)
    .then(r => {
      dispatch(sendObservations(r));
      dispatch(observationsLoading(false));
      return r;
    });

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
          dispatch(selectUnit(r));
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
}