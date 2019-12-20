import {
  mergeAll
} from 'lodash/fp';

let appConfig = {};
try {
  appConfig = require('../.config.json') || {}; // eslint-disable-line
} catch (e) {
  console.error('.config.json not set!!!! using default config with testing data');
}

const defaults = {
  tilesUrl: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  events: {
    source_type: 'testing_events',
    config: {},
    idField: 'id',
    dateField: 'date',
    filter_fields: [
      {
        key: 'tags',
        type: 'tagsFilter',
        config: {
          max: 100
        }
      },
      {
        key: 'severity',
        type: 'select',
        config: {
          max: 8
        }
      },
    ]
  },
  observations: {
    source_type: 'testing_observations',
    config: {},
    idField: 'id',
  }
};

// TODO: read config from url parameters

const allConfig = mergeAll([
  defaults,
  appConfig,
]);

export default allConfig;
