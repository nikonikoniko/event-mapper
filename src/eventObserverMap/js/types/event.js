import {
  zipObjectDeep,
  keys,
  values,
  map,
  pipe,
  filter,
  intersectionBy,
  size,
  compact,
} from 'lodash/fp';

import appConfig from '../../../config';

const {
  events: {
    idField,
    dateField,
  }
} = appConfig;

// turn column headers like tags.0 tags.1 tags.3 into [tag, tag, tag]
export const zipEvent = u => zipObjectDeep(keys(u), values(u));
export const zipEvents = map(zipEvent);

export const hasLocation = u => (u.latitude && u.longitude);
export const haveLocation = filter(hasLocation);

export const noHasLocation = u => (!u.latitude && !u.longitude);
export const noHaveLocation = filter(noHasLocation);

export const intersectionById = intersectionBy(idField);

// do the events have a date associated with them?
export const dateIncludedP = us => !!size(compact(map(dateField, us)));

export const clean = pipe(
  zipEvent,
  u => u,
);

export default {
  zipEvent,
  zipEvents,
  clean,
  hasLocation,
  haveLocation,
  noHasLocation,
  noHaveLocation,
};
