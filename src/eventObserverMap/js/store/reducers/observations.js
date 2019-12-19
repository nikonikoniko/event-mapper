import {
  merge,
} from 'lodash/fp';

import {params} from '../params';


const defaultUnit = {
  updating: true,
  id: params.unit || '',
  meat: {}};

const observation = (state = defaultUnit, action) => {
  switch (action.type) {
    case 'SELECT_UNIT':
      return merge(state, {
        id: action.unit.reference_code,
        meat: action.unit
      });
    case 'UNSET_UNIT':
      return merge(defaultUnit, {id: ''});
    case 'REQUEST_UNIT':
      return merge(state, {updating: action.received});
    default:
      return state;
  }
};

export {
  observation,
};
