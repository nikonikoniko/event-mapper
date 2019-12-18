// import Promise from 'bluebird';
import tabletop from './tabletop';
// import events from '../../../data/events.json';

const api = (config) => {
  const {
    spreadsheet_id: eventsKey,
    sheet_name: eventsSheetName,
  } = config;


  const getEvents = () => tabletop(eventsKey).getSheet(eventsSheetName);

  return {
    get: getEvents,
    post: getEvents,
  };
};

export default config => api(config);
