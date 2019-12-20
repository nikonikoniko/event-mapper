import moment from 'moment';
import {reduce, each, uniq, omit, isEmpty, compact, last, merge, isArray} from 'lodash/fp';

import history from './history';

const reduceW = reduce.convert({cap: false});

export const querystring = reduceW((a, v, k) => {
  const vv = isArray(v) ? ',' + uniq(v).join(',') : v;
  console.log(vv);
  return (v ? `${a}${k}=${vv}&` : a);
}, '?');
                                 ;

export const query = () => {
  const search = location.search.substring(1);
  const ks = compact(search.split('&'));
  const dict = {};
  each(i => {
    const k = i.split('=')[0];
    const v = decodeURI(i.split('=')[1]);
    dict[k] = v;
    if (k === 'before' || k === 'after') {
      dict[k] = moment(v).format('YYYY-MM-DD');
    }
    console.log(k, v);
    console.log('asdasdasdasdasdasdasd');
    if (v.includes(',')) {
      dict[k] = uniq(compact(v.split(',')));
    }
    console.log(dict);
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
