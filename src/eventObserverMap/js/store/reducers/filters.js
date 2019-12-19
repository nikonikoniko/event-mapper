import {
  merge, set
} from 'lodash/fp';


const stats = (
  state = {},
  {type, payload}
) => {
  switch (type) {
    default:
      return state;
  }
};

const filters = (
  state = {},
  {type, payload}
) => {
  switch (type) {
    case 'SEND_FILTERS':
      return merge(
        state,
        {filters: payload}
      );
    case 'RESET_FILTERS':
      return set('filters', {}, state);
    default:
      return state;
  }
};

export {
  filters,
  stats
};
