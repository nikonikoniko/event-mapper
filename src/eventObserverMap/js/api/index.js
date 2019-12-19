import {
  get,
  zipObjectDeep,
  keys,
  values,
  map,
} from 'lodash/fp';

import jsonApi from './jsonApi';
import sheetsApi from './sheetsApi';

import config from '../../../config';

import testingEvents from '../../../../data/testing_events.json';
import testingObservations from '../../../../data/testing_observations.json';

const mapExpandedArrays = map(u => zipObjectDeep(keys(u), values(u)));
const testingEventsApi = () => ({
  get: () => Promise.resolve(mapExpandedArrays(testingEvents)),
  post: () => Promise.resolve(mapExpandedArrays(testingEvents)),
});
const testingObservationsApi = () => ({
  get: () => Promise.resolve(mapExpandedArrays(testingObservations)),
  post: () => Promise.resolve(mapExpandedArrays(testingObservations)),
});

const {
  events: {
    source_type: eventSource,
    config: eventConfig,
  },
  observations: {
    source_type: observationSource,
    config: observationConfig,
  }
} = config;

const apis = {
  http_json: jsonApi,
  file_json: jsonApi,
  google_sheet: sheetsApi,
  testing_events: testingEventsApi,
  testing_observations: testingObservationsApi,
};

export default {
  events: apis[eventSource](eventConfig),
  observations: apis[observationSource](observationConfig),
};
