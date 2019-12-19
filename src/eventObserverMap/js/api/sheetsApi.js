// import Promise from 'bluebird';
import {
  zipObjectDeep,
  keys,
  values,
  map,
} from 'lodash/fp';


import tabletop from './tabletop';
// import events from '../../../data/events.json';

const api = (config) => {
  const {
    spreadsheet_id: eventsKey,
    sheet_name: eventsSheetName,
  } = config;


  const getEvents = () => tabletop(eventsKey).getSheet(eventsSheetName);

  // turn column headers like tags.0 tags.1 tags.3 into [tag, tag, tag]
  const mapExpandedArrays = map(u => zipObjectDeep(keys(u), values(u)));

  return {
    get: () => getEvents().then(mapExpandedArrays),
    post: () => getEvents().then(mapExpandedArrays),
  };
};

export default config => api(config);
