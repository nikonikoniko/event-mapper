import Promise from 'bluebird';

import {
  zipObjectDeep,
  keys,
  values,
  map,
} from 'lodash/fp';

import events from '../../../../data/testing_events.json';

const mapExpandedArrays = map(u => zipObjectDeep(keys(u), values(u)));

const api = (config) => {
  console.log('whaaaaaaaaaooooooa', config);
  return {
    get: (resource) => {console.log('aaaa'); return Promise.resolve(mapExpandedArrays(events)); }, // eslint-disable-line
    post: (...args) => {console.log('aaaa'); return Promise.resolve(mapExpandedArrays(events)); }, // eslint-disable-line
  };
};

export default config => api(config);
