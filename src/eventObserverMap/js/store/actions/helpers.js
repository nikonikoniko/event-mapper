import {
  isEmpty, isEqual,
} from 'lodash/fp';

import {store} from '../index';

const shouldUpdate = newFilters => {
  const {
    filters, events
  } = store.getState();
  return (
    !isEqual(newFilters, filters)
    || isEmpty(events.ds)
  );
};


export {
  shouldUpdate,
};
