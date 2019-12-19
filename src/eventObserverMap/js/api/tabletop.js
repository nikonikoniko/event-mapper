import Promise from 'bluebird';
import Tabletop from 'tabletop';

import {
  map, set, reduce, keys
} from 'lodash/fp';

// turn a tabletop entry into a zipped entry according to dot notation
// eg combine rows tags.0, tags.1 into tags[]
const zipEntry = entry => reduce(
  (a, k) => set(k, entry[k], a),
  entry,
  keys(entry)
);

export default (key) => {
  //
  // make a promise out of tableTop so it can be called with 'then'
  // TODO: handle tabletop error
  const tabletopPromise = () => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      Tabletop.init({
        key,
        callback: (data, tt) => {
          resolve(data);
        }
      });
    });
  };

  const getSheet = sheetName => tabletopPromise()
    .then(rs => {
      const sheet = rs[sheetName];
      const entries = sheet.elements;

      const zippedEntries = map( // zip together rows of dot notation
        zipEntry,
        entries
      );

      return zippedEntries;
    });

  // would do it this way, but no API key:
  // const sheetsUrl = sheet =>
  //   `https://sheets.googleapis.com/v4/spreadsheets/${key}/values/${sheet}`; // ?key=API_KEY`

  // const getSheet = sheetName => fetch(sheetsUrl(sheetName))
  //   .then(rs => {
  //     console.log('ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  //     // console.log(rs.json());
  //     return rs.json()
  //     // return rs[sheetName].elements;
  //   })
  //   .then(els => {
  //     console.log(els);
  //   })
  //   .catch(console.log);

  return {
    getSheet
  };
};
