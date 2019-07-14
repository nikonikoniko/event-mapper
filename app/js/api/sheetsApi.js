// import Promise from 'bluebird';
import tabletop from './tabletop';
// import events from '../../../data/events.json';

const api = (config) => {
  const {
    events: {
      spreadsheet: eventsKey,
      sheet: eventsSheetName,
    },
  } = config;


  const getEvents = () => tabletop(eventsKey).getSheet(eventsSheetName)

  return {
    get: getEvents,
    // get: (resource) => {console.log('aaaa'); return Promise.resolve(events); }, // eslint-disable-line

    post: getEvents,
    // post: (...args) => {console.log('aaaa'); return Promise.resolve(events); }, // eslint-disable-line

  };
};

export default config => api(config);
