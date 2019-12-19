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
    filter_fields: [
      {
        key: 'tags',
        type: 'tagsFilter',
        config: {
          max: 3
        }
      }
    ]
  },
  observations: {
    source_type: 'testing_observations',
    config: {},
  }
};

// TODO: read config from url parameters

const allConfig = mergeAll([
  defaults,
  appConfig,
]);

export default allConfig;
