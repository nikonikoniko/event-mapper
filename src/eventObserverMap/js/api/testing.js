import {
} from 'lodash/fp';

import testingEvents from '../../../../data/testing_events.json';
import testingObservations from '../../../../data/testing_observations.json';

import {
  clean,
} from '../types/event.js';

export const testingEventsApi = () => ({
  get: () => Promise.resolve(clean(testingEvents)),
  post: () => Promise.resolve(clean(testingEvents)),
});
export const testingObservationsApi = () => ({
  get: () => Promise.resolve(clean(testingObservations)),
  post: () => Promise.resolve(clean(testingObservations)),
});

export default {
  testingEventsApi,
  testingObservationsApi,
};
