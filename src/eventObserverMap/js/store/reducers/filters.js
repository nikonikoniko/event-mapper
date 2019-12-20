import {
  set
} from 'lodash/fp';

const filters = (
  state = {},
  {type, payload}
) => {
  console.log('uuuuuuuuuupdaaaate fiiiilttterrsss');
  console.log(type, payload);
  switch (type) {
    case 'UPDATE_FILTERS':
      console.log('updating');
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
