import {
  get,
} from 'lodash/fp';

import jsonApi from './jsonApi';
import sheetsApi from './sheetsApi';

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
};

export default {
  events: apis[eventSource](eventConfig),
  observations: apis[observationSource](observationConfig),
};
