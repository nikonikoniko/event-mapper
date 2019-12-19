
import jsonApi from './jsonApi';
import sheetsApi from './sheetsApi';
import {
  testingEventsApi,
  testingObservationsApi,
} from './testing.js';

import config from '../../../config';

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
