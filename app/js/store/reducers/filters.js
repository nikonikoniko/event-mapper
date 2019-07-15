import {
  merge, set
} from 'lodash/fp';


const stats = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const filters = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_FILTERS':
      return merge(state, {filters: action.filters});
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
