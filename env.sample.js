// import { jsonApi } from "./app/js/api";

// export const databaseApiUrl = '/';

// export const tilesUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// export const tilesUrl = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';

export const tilesUrl = 'https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';

export const apiType = 'sheetsApi';

const jsonApiConfig = {
  hello: 'world',
};

const sheetsApiConfig = {
  events: {
    spreadsheet: '1NFJg-zzltsHS0s1nZBYI6BriJN0MWra1_lmBwb4V4',
    sheet: 'Sheet1',
  },
  observations: {
    spreadsheet: '1NFJg-zzltsHS0s1nZBYBq9riJN0MWra1_lmBwb4V4',
    sheet: 'Sheet2',
  },
};

export const apiConfig = sheetsApiConfig;


export default {
  tilesUrl,
  apiType,
  apiConfig,
};
