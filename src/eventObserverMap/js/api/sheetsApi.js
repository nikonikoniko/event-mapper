// import Promise from 'bluebird';
import {
} from 'lodash/fp';


import {
  clean,
} from '../types/event.js';

import tabletop from './tabletop';
// import events from '../../../data/events.json';

const api = (config) => {
  const {
    spreadsheet_id: eventsKey,
    sheet_name: eventsSheetName,
  } = config;


  const getEvents = () => tabletop(eventsKey).getSheet(eventsSheetName);

  return {
    get: () => getEvents().then(clean),
    post: () => getEvents().then(clean),
  };
};

export default config => api(config);
