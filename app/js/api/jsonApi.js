import Promise from 'bluebird';

import events from '../../../data/events.json';
// import units from '../../data/units.json';


const api = (config) => {
  console.log('wheeeeee', config);
  return {
    get: (resource) => {console.log('aaaa'); return Promise.resolve(events); }, // eslint-disable-line
    post: (...args) => {console.log('aaaa'); return Promise.resolve(events); }, // eslint-disable-line
  };
};

export default config => api(config);
