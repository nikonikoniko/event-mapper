import {
  filter,
  isEmpty,
  intersection,
  getOr,
  map,
  pipe,
  mergeAll,
} from 'lodash/fp';

import appConfig from './config';

const {
  events: {
    filter_fields: customFilters,
  }
} = appConfig;

console.log(appConfig);
console.log(customFilters);

const types = { // depending on the type of filter,
  // take a filter config and return the function to accurately
  // filter a selection of units on this filter
  tagsFilter: ({key, _type, _config}) => // eslint-disable-line
    (selectedTagsArray, units) => (
      isEmpty(selectedTagsArray) ?
        units :
        filter(u => !isEmpty(intersection(selectedTagsArray, getOr([], key, u))))(units)
    )
};

const createFilterFunction = ({key, type, config}) => {
  console.log(key, type, config);
  return ({
    ['_' + key]: types[type]({key, type, config})
  });
};

const customFilterFunctions =
      pipe(
        map(createFilterFunction),
        mergeAll
      )(customFilters);

console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppp');
console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppp');
console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppp');
console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppp');
console.log('ppppppppppppppppppppppppppppppppppppppppppppppppppp');
console.log(customFilterFunctions);

export const defaultFiltersFunctions = {
  tags:
  (tagsArray, us) =>
    (isEmpty(tagsArray) ?
     us :
     filter(u => !isEmpty(intersection(tagsArray, getOr([], 'tags', u))))(us)
    ),
  term:
  (term, us) =>
    (isEmpty(term) ?
     us :
     filter(u => u.id.includes(term))(us))
  ,

};

export const sorts = {

};

export const buttons = ['manufacturer', 'pattern-maker', 'GOTS', 'fair-trade', 'cotton'];

export const filterFunctions =
      mergeAll([
        defaultFiltersFunctions,
        customFilterFunctions,
      ]);

console.log('hey');
console.log(filterFunctions);

export default {
  filterFunctions,
  sorts
};
