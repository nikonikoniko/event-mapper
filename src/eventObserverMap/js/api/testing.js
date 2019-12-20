import {
} from 'lodash/fp';

import testingEvents from '../../../../data/testing_events.json';
import testingObservations from '../../../../data/testing_observations.json';

import {
  cleanMany,
} from '../types/event.js';

export const testingEventsApi = () => ({
  get: () => Promise.resolve(cleanMany(testingEvents)),
  post: () => Promise.resolve(cleanMany(testingEvents)),
});
export const testingObservationsApi = () => ({
  get: () => Promise.resolve(cleanMany(testingObservations)),
  post: () => Promise.resolve(cleanMany(testingObservations)),
});

export default {
  testingEventsApi,
  testingObservationsApi,
};
