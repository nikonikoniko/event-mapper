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
  get,
  curry,
  uniqBy,
  xorBy,
} from 'lodash/fp';

import moment from 'moment';
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

export const date = get(dateField);

export const inRange = curry(
  ([startDate, endDate], u) => (
    moment(date(u)) >= moment(startDate) &&
    moment(date(u)) <= moment(endDate)
  ));
export const filterByRange =
  ([startDate, endDate], us) => filter(inRange([startDate, endDate]), us);

export const uniqById = uniqBy(idField);
export const xorById = xorBy(idField);

export const cleanOne = pipe(
  zipEvent,
  u => u,
);
export const cleanMany = map(cleanOne);

export default {
  zipEvent,
  zipEvents,
  cleanOne,
  cleanMany,
  hasLocation,
  haveLocation,
  noHasLocation,
  noHaveLocation,
  inRange,
  filterByRange,
  uniqById,
  xorById,
};
