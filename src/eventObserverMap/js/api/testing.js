import {
  get,
  zipObjectDeep,
  keys,
  values,
  map,
} from 'lodash/fp';

import testingEvents from '../../../../data/testing_events.json';
import testingObservations from '../../../../data/testing_observations.json';

const mapExpandedArrays = map(u => zipObjectDeep(keys(u), values(u)));
export const testingEventsApi = () => ({
  get: () => Promise.resolve(mapExpandedArrays(testingEvents)),
  post: () => Promise.resolve(mapExpandedArrays(testingEvents)),
});
export const testingObservationsApi = () => ({
  get: () => Promise.resolve(mapExpandedArrays(testingObservations)),
  post: () => Promise.resolve(mapExpandedArrays(testingObservations)),
});

export default {
  testingEventsApi,
  testingObservationsApi,
};
