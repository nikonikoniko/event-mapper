import moment from 'moment';
import {
  reduce,
  each,
  uniq,
  omit,
  isEmpty,
  compact,
  merge,
  isArray
} from 'lodash/fp';

import history from './history';

const reduceW = reduce.convert({cap: false});

// turn a dictionary of filters into a query string such as ?key=val&key=val
export const querystring = reduceW((a, v, k) => {
  // if the value is an array, make sure it's surrounded by commas for unpacking later
  // add a comma at the beginning to signify it's an array
  const vv = isArray(v) ? `,${uniq(v).join(',')}` : v;
  // put the query string together
  return (v ? `${a}${k}=${vv}&` : a);
}, '?');

export const query = () => {
  // given a query string, return a valid dictionary of filters
  // get the query string without the preceding ?
  const search = location.search.substring(1);
  // get a list of key=value strings
  const ks = compact(search.split('&'));
  const dict = {};
  // create the dictionary
  each(i => {
    const k = i.split('=')[0];
    const v = decodeURI(i.split('=')[1]);
    dict[k] = v;
    // if it's a date, format it correctly
    if (k === 'before' || k === 'after') {
      dict[k] = moment(v).format('YYYY-MM-DD');
    }
    // if it has a comma, it's an array, so treat it as one
    if (v.includes(',')) {
      dict[k] = uniq(compact(v.split(',')));
    }
  })(ks);
  return omit(isEmpty, dict);
};

export const updateQS = fs => {
  const h = window.location.hash;
  const myURL = [location.pathname].join('');
  const qs = querystring(fs).slice(0, -1);
  history.replace(`${myURL}${qs}${h}`);
  return document.location;
};

export const backQS = fs => {
  const h = window.location.hash;
  const myURL = [location.pathname].join('');
  const uqs = merge(query(), fs);
  const qs = querystring(uqs).slice(0, -1);
  history.push(`${myURL}${qs}${h}`);
  return document.location;
};

export const params = {
  unit: query().unit,
  event: query().event,
  filters: omit(['unit', 'event'], query()),
};

export const updateParams = state => {
  updateQS(state.filters);
  if (!isEmpty(state.observation.id)) {
    backQS({unit: state.unit.id});
  } // else { updateQS({unit: ''}); }
  if (!isEmpty(state.event.id)) {
    backQS({event: state.event.id});
  } // else { updateQS({event: ''}); }
};


export default {params, updateParams};
