import {
  set
} from 'lodash/fp';

const filters = (
  state = {},
  {type, payload}
) => {
  switch (type) {
    case 'UPDATE_FILTERS':
      return payload;
    case 'RESET_FILTERS':
      return set('filters', {}, state);
    default:
      return state;
  }
};

export {
  filters, // eslint-disable-line
};
