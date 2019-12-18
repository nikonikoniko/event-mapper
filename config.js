import {
  mergeAll
} from 'lodash/fp';

const appConfig = require('./.config.json') || {}; // eslint-disable-line

const defaults = {
  tilesUrl: 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
  events: {
    source_type: null,
    spreadsheet: null,
    sheet: null
  },
  observations: {
    source_type: null,
    spreadsheet: null,
    sheet: null,
  }
};

const allConfig = mergeAll([
  defaults,
  appConfig,
]);

export default allConfig;
